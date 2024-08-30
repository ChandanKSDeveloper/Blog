import { Typography } from "@material-tailwind/react";
import React from "react";
const HeroSection = () => {
    return (
        <section className="bg-[#E9FF97]">

            {/* Hero Section */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image */}
                            <div className="flex justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" alt="" />
                            </div>

                            {/* Text */}
                            <h1 className="text-3xl lg:text-5xl text-teal-400 font-bold">
                                Tech Blog
                            </h1>

                            {/* Paragraph */}
                            <p
                                className="sm:text-3xl text-xl font-extralight sm:mx-auto ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ut.

                            </p>

                        </div>

                    </div>
                </main>

            </div>
            <Typography>
                
            </Typography>
        </section>
    )
}

export default HeroSection;