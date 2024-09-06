import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteService from '../../appwrite/config';
import { Button } from "@material-tailwind/react";
import parse from "html-react-parser";
import {deletePost, fetchPosts} from '../../store/allblogsSlice'
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import {NotFound, BlogPostSkeleton} from '../../components/index'

const BlogInfo = () => {
    const [post, setPost] = useState(null);
    const[loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;


    useEffect(() => {
        const fetchPostBySlug = async () => {
            try {
                const fetchedPost = await appwriteService.getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    // navigate('/');
                    // console.log("no post found")
                }
            } catch (error) {
                navigate('/');
            } finally {
                setLoading(false);  // Set loading to false when done
            }
        };

        if (slug) {
            fetchPostBySlug();
        } else {
            // navigate('/');
            // console.log("wrong console");
            
        }
    }, [slug, navigate]);

    
    // const deletePostHandler = (postId) => {
    //     dispatch(deletePost(postId));
    //     appwriteService.deletePost(postId).then(() => {
    //         toast.success("Post deleted successfully");
    //         navigate('/'); 
    //     }).catch((error) => {
    //         // console.log("Error deleting post:", error);
    //         toast.error("Failed to delete post");
    //     })
    // }

    const deletePostHandler = (postId) => {
        appwriteService.deletePost(postId)
            .then(() => {
                dispatch(deletePost(postId));
                toast.success("Post deleted successfully");
                navigate('/');  // Navigate after deleting
            })
            .catch((error) => {
                // console.log("Error deleting post:", error);
                toast.error("Failed to delete post");
            });
    };

    // const sanitizedContent = post ? DOMPurify.sanitize(post.content) : ""  // Sanitize HTML content

    const sanitizedContent = post
    ? DOMPurify.sanitize(post.content, {
        ALLOWED_TAGS: ["b", "i", "u", "strong", "em", "p", "span", "ul", "li", "ol", "a", "h1", "h2", "h3", "img"],
        ALLOWED_ATTR: ["href", "src", "alt", "title", "style"]
    })
    : "";


    if(loading){
        return <BlogPostSkeleton />
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
                        <Button onClick={() => deletePostHandler(post.$id)}>
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
                    {/* {parse(post.content)} */}
                    {parse(sanitizedContent)}
                </div>
                

            </div>
        </div>
    ) : <NotFound />
}

export default BlogInfo;