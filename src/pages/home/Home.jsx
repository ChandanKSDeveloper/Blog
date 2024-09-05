import React,{useEffect, useState} from "react";
import authService from '../../appwrite/auth'
import { HeroSection, BlogPostCard, Layout, BlogPostSkeleton } from '../../components/index'
import { useSelector,useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {login as authLogin} from '../../store/authSlice'
import {fetchPosts} from '../../store/allblogsSlice';
import { Button } from "@material-tailwind/react";

const Home = () => {

    const isLoggedIn = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    // console.log(isLoggedIn);
    // console.log(userData);

    const dispatch = useDispatch();


    const [visiblePosts, setVisiblePost] = useState(4); // Number of posts to show initially
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    
    const posts = useSelector((state) => state.allblogs.posts);
    const status = useSelector((state) => state.allblogs.status);


    useEffect(() => {
        if(status === 'idle'){
            setIsLoading(true); // Start Loading
            // dispatch(fetchPosts());
            dispatch(fetchPosts()).then(() => setIsLoading(false)); // Stop loading after fetching
        }
    },[dispatch,status])

    useEffect(() => {
        fetchPosts();
    },[fetchPosts])

    useEffect(() => {
        const checkSession = async() => {
            try{
                const user = await authService.getCurrentUser();
                if(user){
                    dispatch(authLogin(user));
                    // toast.success("Welcome back")
                } else {
                    // console.error("No user session found.");
                }
            } catch(error) {
                // No active session or error fetching user
                // console.error("No active session or error fetching user:", error);
            }
        };
        checkSession();
    },[dispatch])


    // Function to load more Posts
    const loadMorePosts = () => {
        setIsLoading(true); // Start loading
        setVisiblePost((prev) => prev + 4);// Increase the number of visible posts by 4
        setIsLoading(false);  // Stop loading after posts are added
    } 

    return(
        <Layout>
            <HeroSection />


               <div className="bg-[#FFEEAD]">


            <div className=" flex flex-wrap justify-center items-center bg-[#FFEEAD]">

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

            {/* {
                posts.map((post) => (
                    <div key={post.$id} className='p-2'>
                        <BlogPostCard {...post} />
                    </div>
                ))
            } */}

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
                            disabled={isLoading}
                            >
                           {isLoading ? "Loading..." : "Load More"}
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

            </div>

        </Layout>
    )
}

export default Home;