import React, { useEffect, useState } from "react";
import {BlogPostCard} from '../../components/index';
import appwriteService from '../../appwrite/config'
import {fetchPosts} from '../../store/allblogsSlice'
import { useSelector, useDispatch } from "react-redux";


const AllBlogs = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.allblogs.posts);
    const status = useSelector((state) => state.allblogs.status);

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPosts());
        }
    },[dispatch,status])

    useEffect(() => {
        fetchPosts();
    },[fetchPosts])


    // const [posts,setPosts] = useState([]);
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((post) => {
    //         if(post){
    //             setPosts(post.documents);
    //         }
    //     })
    // },[])

    return(
        <div className='w-full py-8'>
            <div className='flex flex-wrap grow'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w1/4'>
                        <BlogPostCard {...post} />
                    </div>
                ))}
            </div>
            
    </div>
    )
}

export default AllBlogs;