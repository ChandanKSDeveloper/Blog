import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteService from '../../appwrite/config';
import { Button } from "@material-tailwind/react";
import parse from "html-react-parser";

const BlogInfo = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) setPost(post);
                else navigate('/');
            })
        } else {
            navigate('/');
        }
    },[slug,navigate]);

    const deletePostHandler = (postId) => {
        dispatch(deletePost(postId));
        appwriteService.deletePost(postId).then(() => {
            toast.success("Post deleted successfully");
        }).catch((error) => {
            console.log("Error deleting post:", error);
            toast.error("Failed to delete post");
        })
    }

    return post ? (
        <div className="py-8">
            <div className="w-full flex flex-col justify-center mb-4 relative border rounded-xl p-2">
                <img src={appwriteService.getFilePreview(post.thumbnail)} alt={post.title} className="rounded-xl w-full h-[500px]"/>

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/editpost/${post.$id}`}>
                            <Button className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={deletePostHandler}>
                            Delete
                        </Button>
                    </div>
                )}

                {/* Blog Date  */}
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {new Date(post.createdOn).toLocaleDateString() }
                </h2>

                {/* Blog Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>
                

            </div>
        </div>
    ) : null
}

export default BlogInfo;