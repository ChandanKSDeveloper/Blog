import React from "react";
import { Button } from "@material-tailwind/react";
import appwriteService from '../../appwrite/config'
import { Link } from "react-router-dom";

const BlogPostCard = ({$id, title, thumbnail, createdOn}) => {

    const previewUrl = thumbnail ? appwriteService.getFilePreview(thumbnail) : 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg';

    return (
        <Link to={`/bloginfo/${$id}`}>
    
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto max-w-7xl ">

                        {/* Main Content */}
                        <div className="flex flex-wrap justify-center -m-4 mb-5">

                            {/* Card 1  */}
                            <div className="p-4 w-[300px] h-[400px]">

                                <div className="border-b-4 border-[#1e293b] h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden">

                                    {/* Blog Thumbnail */}

                                    {/* <img className=" w-full" src={appwriteService.getFilePreview(thumbnail)} alt={title} /> */}
                                    <img className=" w-[350px]" src={previewUrl} alt={title} />

                                    {/* Top Items  */}
                                    <div className="p-6">
                                        {/* Blog Date  */}
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                {new Date(createdOn).toLocaleDateString() }
                                            </h2>

                                            {/* Blog Title  */}
                                            <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                                            {title}
                                            </h1>

                                            {/* Blog Description
                                            <p className="leading-relaxed mb-3" >
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, aut!
                                            </p> */}
                                    </div>
                                </div>
                            </div>

                        
                        </div>

                        {/* See More Button
                        <div className="flex justify-center my-5">
                            <Button>
                                See More
                            </Button>

                        </div> */}

                    </div>
                </section>
        </Link>
    )
}

export default BlogPostCard;