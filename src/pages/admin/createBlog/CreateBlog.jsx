import React,{ useCallback } from "react";
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
    // Store this api key in .env file 
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });


    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {

        if(!userData){
            toast.error("User is not logged in.");
            navigate('/adminlogin'); // Or any other appropriate route
            return;
        }
        // Editing a existing post
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if(file){
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                //handle error and undefined case properly
                featuredImage : file ? file.$id : undefined
            });

            if(dbPost){
                toast.success("Post Edited Successfully");
                navigate(`/bloginfo/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({...data, userId:userData.$id});

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
                        {post? `Edit`:`Create`} blog
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
                    <RTE label="" name="content" control={control} defaultValue={getValues("content")} 
                        //Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
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
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                
                
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
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