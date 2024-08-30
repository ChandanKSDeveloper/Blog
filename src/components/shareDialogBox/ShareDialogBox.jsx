import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import {AiOutlineShareAlt, AiFillLinkedin, AiFillInstagram, AiFillGithub, AiFillFacebook} from 'react-icons/ai'


const ShareDialogBox = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <Fragment>
            <div className="ml-auto">
                <AiOutlineShareAlt size={30} onClick={handleOpen} className="cursor-pointer hover:shadow-2xl hover:scale-150 duration-200"/>
            </div>

            {/* Dialog */}
            <Dialog 
                className="relative  right-[1em] w-[25em] rounded-3xl md:right-0 md:w-0 lg:right-0 lg:w-0" 
                open={open} 
                handler={handleOpen}
            
            >
                <DialogBody>
                    
                    <div className="flex justify-center flex-wrap sm:mx-auto sm:mb-2 -mx-2 mt-4 mb-2">
                        
                        {/* Main */}
                        <div className="">
                            <div className="flex gap-3 outline-none">

                                {/* Linkedin Icon */}
                                <div className="">
                                    <a href="" className="outline-none">
                                        <AiFillLinkedin size={35} />
                                    </a>
                                </div>

                                {/* Instagram icon */}
                                <div className="">
                                    <a href="">
                                        <AiFillInstagram size={35} />
                                    </a>
                                </div>

                                {/* Github Icon */}
                                <div className="">
                                    <a href="">
                                        <AiFillGithub size={35} />
                                    </a>
                                </div>

                                {/* Facebook Icon */}
                                <div className="">
                                    <a href="">
                                        <AiFillFacebook size={35} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-gray-600">Powered By TechLibre</h1>
                    </div>
                </DialogBody>
            </Dialog>
        </Fragment>
    )
}

export default ShareDialogBox;