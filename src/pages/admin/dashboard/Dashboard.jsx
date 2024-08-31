import React from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoPersonCircle } from "react-icons/io5";
import { Layout } from "../../../components";
import authService from '../../../appwrite/auth'
import { useDispatch } from "react-redux";
import {logout as logoutAction } from '../../../store/authSlice'


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logout function
    const logoutHandler = async() => {
        try {
            await authService.logout();
            toast.success("Logout successfully")
            dispatch(logoutAction())
            navigate('/')
            
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }

    }

    return(
        
        <div className="py-10">
            <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                <div className="left-0">
                    <IoPersonCircle size={100}/> 
                </div>

                <div className="right-0">
                    <h1 className="text-center font-bold text-2xl mb-2">
                        Tech Blog
                    </h1>

                    <h2 className="font-semibold">
                        Blog Creator
                    </h2>

                    <h2 className="font-semibold">
                        TechLibre@mail.com
                    </h2>

                    <h2 className="font-semibold">
                        <span>Total Blog : </span> {`15`}
                    </h2>

                    <div className="flex gap-2 mt-2">
                        <Link
                            to={'/createblog'}>

                            <div className="mb-2">
                            <Button
                                className="px-8 py-2">
                                Create Blog
                            </Button>
                            </div>
                        </Link>

                        <div className="mb-2">
                        <Button
                            onClick={logoutHandler}
                            className="px-8 py-2">
                            Logout
                        </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Line */}
            <hr className="border-2"/>
            {/* Table */}
            <div>
                <div className="container mx-auto px-4 max-w-7xl my-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                           {/* table */}
                           <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                                {/* thead */}
                                <thead
                                    className="text-xs">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S.No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Thumbnail
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                {/* tbody */}
                                <tbody>
                                    <tr className="border-b-2 bg-cyan-200" >

                                        {/* S.No */}
                                        <td className="px-6 py-4">
                                            {`1.`}
                                        </td>

                                        {/* Blog Thumbnail */}
                                        <td className="px-6 py-4">
                                            {/* Thumbnail */}
                                            <img src={'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'} alt="thumbnail" className="w-16 rounded-lg" />
                                        </td>

                                        {/* Blog Title */}
                                        <td className="px-6 py-4">
                                            {`React Introduction`}
                                        </td>

                                        {/* Blog Category */}
                                        <td className="px-6 py-4">
                                            {`React.js`}
                                        </td>

                                        {/* Blog Date */}
                                        <td className="px-6 py-4">
                                            {`25 Aug 2024`}
                                        </td>

                                        {/* Delete Blog */}
                                        <td className="px-6 py-4">
                                            <button className="px-4 py-1 rounded-lg text-white font-bold bg-red-500">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dashboard;