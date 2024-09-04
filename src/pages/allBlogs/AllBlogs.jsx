import React, { useEffect, useState } from "react";
import {BlogPostCard} from '../../components/index';
import appwriteService from '../../appwrite/config'
import {fetchPosts} from '../../store/allblogsSlice'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import {BlogPostSkeleton} from '../../components/index';
import { AiOutlineLoading } from "react-icons/ai";

const AllBlogs = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.allblogs.posts);
    const status = useSelector((state) => state.allblogs.status);

    const [visiblePosts, setVisiblePost] = useState(4);
    const [isLoading, setIsLoading] = useState(false); // State to track loading

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPosts()).then(() => setIsLoading(false));
        }
    },[dispatch,status])

    useEffect(() => {
        fetchPosts();
    },[fetchPosts])


    const loadMorePosts = () => {
        setIsLoading(true);
        setVisiblePost((prev) => prev + 4);
        setIsLoading(false);
    }

    return(
        <div className='w-full py-8 flex-col items-center justify-center'>

            <div className='flex flex-wrap grow items-center justify-center'>

                {
                    status === 'loading' && (
                        // Render skeleton placeholders while posts are loading
                        <>
                            <BlogPostSkeleton />
                            <BlogPostSkeleton />
                            <BlogPostSkeleton />
                            <BlogPostSkeleton />
                        </>
                    )
                }

                {
                    posts.slice(0, visiblePosts).map((post) => (
                        <div key={post.$id} className='p-2'>
                            <BlogPostCard {...post} />
                        </div>
                    ))
                }

                </div>

                {
                    visiblePosts < posts.length && (
                        <div className="flex justify-center pb-5">
                            <Button
                                onClick={loadMorePosts}
                                disabled = {isLoading}>
                                {
                                    isLoading ? <AiOutlineLoading className="animate-spin"/> : "Load More"
                                }

                            </Button>

                        </div>
                    )
                }

                {/* Button gets disabled and hidden if no more posts to load */}
                {
                    visiblePosts >= posts.length && (
                        <div className="flex justify-center pb-5">
                        <button
                            className="bg-gray-500 text-white py-2  px-4 rounded mt-4 cursor-not-allowed opacity-50"
                            disabled
                        > No more Posts

                        </button>

                        </div>
                    )
                }


                {/* {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w1/4'>
                        <BlogPostCard {...post} />
                    </div>
                ))} */}
            
            
    </div>
    )
}

export default AllBlogs;