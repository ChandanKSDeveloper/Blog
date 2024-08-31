import React, { useEffect, useState } from "react";
import { Typography, Button, Input, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Layout } from "../../../components";
import {login as authLogin} from '../../../store/authSlice'
import authService from '../../../appwrite/auth'
import { useForm } from "react-hook-form";


const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState:{errors}} = useForm();

    useEffect(() => {
        const checkSession = async() => {
            try{
                const user = await authService.getCurrentUser();
                if(user){
                    dispatch(authLogin(user));
                    navigate('/')
                }
            } catch(error) {
                // No active session or error fetching user
            }
        };
        checkSession();
    },[dispatch, navigate])

    const login = async(data) => {

        try {
            const session = await authService.login(data);
            if (session) {
                toast.success("Login Successfully");
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            toast.error("Login Failed. Please check your credentials and try again.");
            console.log("error :- ", error);
        }
        
        // try {

        //     // Check if user is already logged in
        //     const userData = await authService.getCurrentUser();
        //     if(userData){
        //         dispatch(authLogin(userData))
        //         console.log("3 phase");
        //         navigate('/')
        //         return;
        //     }

        //     // Proceed with login if no session exists
        //     const session = await authService.login(data);
        //     console.log("1 phase");
            
        //     if(session){
        //         toast.success("Login Successfully")
        //         // alert("success")
        //         const newUserData = await authService.getCurrentUser()
        //         console.log("2 phase");
        //         if(newUserData){
        //             dispatch(authLogin(newUserData))
        //             console.log("3 phase");
        //             navigate('/')
        //         } else {
        //             toast.error("Sorry but only Admin can use this.");
        //         }
        //     }
        // } catch (error) {
        //     if(error.message.includes("Creation of a session is prohibited")){
        //         toast.loading("Session is already active. Fetching user data...")
        //         const userData = await authService.getCurrentUser();
        //         if(userData){
        //             dispatch(authLogin(userData));
        //             navigate('/');
        //         } else {
        //             toast.error("Failed to fetch user data.");
        //         }
        //     } else {
        //         toast.error("Login Failed. Please check your credentials and try again.");

        //     }
        //     console.log("error :- ", error)
            
        // }
    }


    return(
        <Layout>

        
        <div className="flex items-center justify-center w-full">

            {/* Card */}
            <Card
                className="w-full max-w-[25rem] bg-blue-gray-400"
                >
                {/* CardHeader */}
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center bg-blue-gray-400"
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        
                        <div className="flex justify-center">
                            {/* image */}
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" alt="img" className="h-20 w-20 rounded-full" />
                        </div>
                    </div>

                    {/* Top Heading */}
                    <Typography variant="h4" color="black">
                        Admin Login
                    </Typography>
                </CardHeader>

                {/* Card Body */}
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
                        {/* First Input */}
                        <div>

                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                color="black"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                       "Email address must be a valid address",
                                    }
                                })}
                            />
                            {errors.email && (
                                <Typography variant="small" color="red">
                                    {errors.email.message}
                                </Typography>
                            )}
                        </div>

                        <div>
                        <Input
                            type="password"
                            label="Password"
                            // value={password}
                            color="black"
                            {...register("password", {
                                required: true,
                            })}                    
                            />
                            {errors.password && (
                                <Typography variant="small" color="red">
                                    {errors.password.message}
                                </Typography>
                            )}
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            // onClick={() => login({email,password})}
                            >
                            Login
                        </Button>


                    </form>
                </CardBody>

            </Card>
             

        </div>
        </Layout>
    )
}

export default AdminLogin;