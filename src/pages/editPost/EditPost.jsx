import React, {useEffect, useState} from 'react'
import appwriteService from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateBlog } from '../../pages/index'
import {fetchPosts } from '../../store/allblogsSlice'
import { useSelector, useDispatch } from 'react-redux';
import {NotFound} from '../../components/index'
import toast from 'react-hot-toast';



const EditPost = () => {
    // const [posts, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    
    
    
    const posts = useSelector((state) => state.allblogs.posts);
    const status = useSelector((state) => state.allblogs.status);
    
    
       try {
        // console.log(posts);
       } catch (error) {
        // console.error("no post:" , error)

       }
        // console.log("Slug: ", slug);
        // console.log("Posts : ",posts);
    
    
        // Find the post by slug from the list of posts
    const post = posts.find((post) => post.$id === slug)


    
    // console.log("matching post : ", post);

    useEffect(() => {
        if(status === "idle"){
            // Fetch posts only if not already loaded
            dispatch(fetchPosts())
        }
    },[dispatch, status])


    useEffect(() => {
        if (!post && status === "succeeded") {
            // console.log("post not found")
        //    navigate('/')
        toast.error("post Not Found");
        } 
    },[post,status, navigate])

    return posts ? (
        <div className='p-8'>
            <CreateBlog post={post}/>
        </div>
    ) : (
        status === 'loading' ? <div>loading...</div> : <NotFound />
    )
}

export default EditPost;