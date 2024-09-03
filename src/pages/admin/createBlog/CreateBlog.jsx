import React,{ useCallback, useEffect } from "react";
import { RTE, Select} from '../../../components/index'
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Typography} from "@material-tailwind/react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import appwriteService from '../../../appwrite/config'

// creating blog and updating existing blog
const CreateBlog = ({post}) => {

    console.log(post)
    // Store this api key in .env file 
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            createdOn: post?.createdOn || "",
            category: post?.category || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    useEffect(() => {
        if (post) {
            setValue("title", post.title);
            setValue("slug", post.$id);
            setValue("createdOn", post.createdOn);
            setValue("category", post.category);
            setValue("content", post.content);
            setValue("status", post.status);
        }
    }, [post, setValue]);


    console.log(post?.title);
    console.log(post?.content);
    


    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData)

    // CreatedOn date
    function getCurrentDate() {
        const date = new Date(); // Get the current date
    
        // Extract day, month, and year
        const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed) and pad with zero
        const year = date.getFullYear(); // Get the full year
    
        // Format the date in "day month year" format
        const formattedDate = `${day} ${month} ${year}`;
        
        return formattedDate;
    }

    const submit = async (data) => {

        if(!userData){
            toast.error("User is not logged in.");
            navigate('/adminlogin'); 
            return;

        }
        // Editing a existing post

        // handling file/ image upload
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if(file){
                appwriteService.deleteFile(post.thumbnail);
            }

            // if (data.content.length > 255) {
            //     // Show an error message or toast
            //     toast.error("Content is too long! Please limit to 255 characters.");
            //     console.log("hello text > 255 chars")
            //     return;
            // }

            //replace old post.$id with new post.$id -> deleting this document and creating a new document
            //instead I just disable to set new title , while give option to edit content and status and image upload

            // Prepare the new data with updated slug

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                //handle error and undefined case properly
                thumbnail : file ? file.$id : undefined
            });

            if(dbPost){
                toast.success("Post Edited Successfully");
                navigate(`/bloginfo/${dbPost.$id}`)
                console.log("new slug -> ",dbPost.$id)
            }

        } else {
            // creating a new post
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.thumbnail = fileId;

                const dbPost = await appwriteService.createPost({...data,createdOn:getCurrentDate() ,userId: userData.$id});

                if(dbPost){
                    toast.success("Post Submitted Successfully");
                    navigate(`/bloginfo/${dbPost.$id}`)
                }
            }
        }

        
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="mt-10 flex-col lg:block mx-5 items-center">   

            {/* Top Item */}

            <div className="mb-2 flex justify-between">
                <div className="flex gap-2 items-center">
                    {/* Dashboard Link */}
                    <Link to={'/dashboard'}>
                        <BsFillArrowLeftCircleFill size={25} />
                    </Link>

                    {/* Text */}
                    <Typography
                        variant="h4"
                        className="font-bold tracking-wide "    
                    >
                        {/* {post? `Edit`:`Create`} blog */}
                        {post ? "Edit" : "Create"} blog
                    </Typography>

                </div> 
            </div>

            {/* Form / Editor */}
            
            <form onSubmit={handleSubmit(submit)} className="flex mt-10 flex-wrap ">
                <div className="lg:w-2/3 flex-col px-2">
                    <div className="mb-5">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            {...register("title", { required: true })}
                            disabled = {!!post} 
                            /* Disable if post exists */
                        />
                    </div>

                    <div className="mb-5">
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>
                    <RTE label="" name="content" control={control} defaultValue={post?.content || getValues("content")} 
                        //Warning: Function components cannot be given refs. Attempts to access this ref will fail. 
                    />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.thumbnail)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                
                    {/* Status -> Active or Inactive */}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                    {/* Category -> react,html -> further edit this and add multiple selecting*/}
                    <Select
                        options={["html", "react"]}
                        label="Status"
                        className="mb-4"
                        placeholder = "label"
                        {...register("category", { required: true })}
                    />

                    <Button type="submit">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog;