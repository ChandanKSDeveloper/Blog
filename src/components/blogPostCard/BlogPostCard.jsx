import React from "react";
import { Button } from "@material-tailwind/react";

const BlogPostCard = () => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto max-w-7xl ">

                    {/* Main Content */}
                    <div className="flex flex-wrap justify-center -m-4 mb-5">

                        {/* Card 1  */}
                        <div className="p-4 md:w-1/3">

                            <div className="border-b-4 border-[#1e293b] h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden">

                                {/* Blog Thumbnail */}

                                <img className=" w-full" src={'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'} alt="blog" />

                                {/* Top Items  */}
                                <div className="p-6">
                                    {/* Blog Date  */}
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            {'25 Sep 2023'}
                                        </h2>

                                        {/* Blog Title  */}
                                        <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                                          {'React Introduction'}
                                        </h1>

                                        {/* Blog Description */}
                                        <p className="leading-relaxed mb-3" >
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, aut!
                                        </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2  */}

                        <div className="p-4 md:w-1/3">

                            <div className="border-b-4 border-[#1e293b] h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden">

                                {/* Blog Thumbnail */}

                                <img className=" w-full" src={'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'} alt="blog" />

                                {/* Top Items  */}
                                <div className="p-6">
                                    {/* Blog Date  */}
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            {'25 Sep 2023'}
                                        </h2>

                                        {/* Blog Title  */}
                                        <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                                          {'React Introduction'}
                                        </h1>

                                        {/* Blog Description */}
                                        <p className="leading-relaxed mb-3" >
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, aut!
                                        </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-4 md:w-1/3">

                            <div className="border-b-4 border-[#1e293b] h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 rounded-xl overflow-hidden">

                                {/* Blog Thumbnail */}

                                <img className=" w-full" src={'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'} alt="blog" />

                                {/* Top Items  */}
                                <div className="p-6">
                                    {/* Blog Date  */}
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            {'25 Sep 2023'}
                                        </h2>

                                        {/* Blog Title  */}
                                        <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
                                          {'React Introduction'}
                                        </h1>

                                        {/* Blog Description */}
                                        <p className="leading-relaxed mb-3" >
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, aut!
                                        </p>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                    {/* See More Button */}
                    <div className="flex justify-center my-5">
                        <Button>
                            See More
                        </Button>

                    </div>

                </div>
            </section>
        </div>
    )
}

export default BlogPostCard;