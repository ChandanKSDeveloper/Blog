import React,{useEffect} from "react";
import authService from '../../appwrite/auth'
import {HeroSection, BlogPostCard,Layout} from '../../components/index'
import { useSelector,useDispatch } from "react-redux";
import toast from "react-hot-toast";


const Home = () => {
    const isLoggedIn = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    console.log(isLoggedIn);
    console.log(userData);

    const dispatch = useDispatch();


    useEffect(() => {
        const checkSession = async() => {
            try{
                const user = await authService.getCurrentUser();
                if(user){
                    dispatch(authLogin(user));
                    toast.success("Welcome back")
                    // navigate('/')
                }
            } catch(error) {
                // No active session or error fetching user
            }
        };
        checkSession();
    },[dispatch])
    return(
        <Layout>
            <HeroSection />
            <BlogPostCard />

        </Layout>
    )
}

export default Home;