import React, { useCallback, useEffect, useState } from "react";
import { RTE, Select } from '../../../components/index';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react"; // Spinner component for loading icon
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import appwriteService from '../../../appwrite/config';
import { fetchPosts } from "../../../store/allblogsSlice";

// Creating and updating blog posts
const CreateBlog = ({ post }) => {
    const [loading, setLoading] = useState(false); // Loading state for async actions
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
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

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // CreatedOn date
    function getCurrentDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const submit = async (data) => {
        if (!userData) {
            toast.error("User is not logged in.");
            navigate('/adminlogin');
            return;
        }

        setLoading(true); // Start loading

        try {
            if (post) {
                // Handle existing post update
                let fileId = post.thumbnail;
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        if (post.thumbnail) {
                            await appwriteService.deleteFile(post.thumbnail);
                        }
                        fileId = file.$id;
                    } else {
                        toast.error("Image upload failed.");
                        return;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    thumbnail: fileId,
                });

                if (dbPost) {
                    toast.success("Post Edited Successfully");
                    navigate(`/bloginfo/${dbPost.$id}`);
                }
            } else {
                // Handle new post creation
                const file = await appwriteService.uploadFile(data.image[0]);
                
                if(!file){
                    // console.log("file not found");
                    
                }
                
                if (file) {
                    const fileId = file.$id;
                    data.thumbnail = fileId;

                    // console.log("File upload response: ", file);
                    

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        createdOn: getCurrentDate(),
                        userId: userData.$id,
                    });

                    // console.log("Create post response:", dbPost);

                    if (dbPost) {
                        toast.success("Post Submitted Successfully");
                        navigate(`/bloginfo/${dbPost.$id}`);
                    }
                } else {
                    toast.error("File upload failed.");
                }
            }

            dispatch(fetchPosts()); // Fetch updated posts after submission
        } catch (error) {
            // console.error("Post submission failed:", error);
            toast.error("Post submission failed.");
        } finally {
            setLoading(false); // Stop loading
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

    useEffect(() => {
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
                    <Link to={'/dashboard'}>
                        <BsFillArrowLeftCircleFill size={25} />
                    </Link>
                    <Typography variant="h4" className="font-bold tracking-wide">
                        {post ? "Edit" : "Create"} blog
                    </Typography>
                </div> 
            </div>

            {/* Form / Editor */}
            <form onSubmit={handleSubmit(submit)} className="flex mt-10 flex-wrap">
                <div className="lg:w-2/3 flex-col px-2">
                    <div className="mb-5">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            {...register("title", { required: true })}
                            disabled={!!post} // Disable if post exists
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
                    <RTE label="" name="content" control={control} defaultValue={post?.content || getValues("content")} />
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
                
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                    <Select
                        options={["Technology", "AI", "Spiritual", "Space"]}
                        label="Category"
                        className="mb-4"
                        {...register("category", { required: true })}
                    />

                    {/* Show loading spinner or submit button */}
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner className="h-5 w-5" /> : post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
