import React, { Fragment, useState,useEffect } from "react";
import {Dialog,DialogBody,Input} from '@material-tailwind/react'
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from '../../store/allblogsSlice'
import appwriteService from '../../appwrite/config'
const SearchDialog = () => {

    const dispatch = useDispatch();


    const[open, setOpen] = useState(false);
    const [searchTerm, setSearchterm] = useState("");

    const posts = useSelector((state) => state.allblogs.posts);
    const status = useSelector((state) => state.allblogs.status);

    const handleOpen = () => {
        setOpen(!open);
        setSearchterm("");
    };

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPosts());
        }
    },[dispatch,status])

    useEffect(() => {
        fetchPosts();
    },[fetchPosts])



    // filter posts based on search term

    const filteredPosts = searchTerm ? posts.filter((post) => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ):[];

    
    // console.log("posts from store",posts);
    // console.log(filteredPosts);

    return (
        <Fragment>
            {/* Search Icon */}
            <div
                onClick={handleOpen}>
                <AiOutlineSearch size={30} className="cursor-pointer hover:shadow-2xl hover:scale-150 duration-200" color="white"/>
            </div>

            {/* Dialog */}
            <Dialog className="relative right-[1em] w-[25em] md:right-0 md:w-0 lg:right-0 lg:w-0" open={open} handler={handleOpen}>
                {/* Dialog body */}
                <DialogBody>

                    <div className="flex w-full justify-center">
                        <Input
                            color="black"
                            type="search"
                            label="Search"
                            className="bg-[#2C3A47]"
                            name="searchkey"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchterm(e.target.value)}
                        />
                    </div>

                    {/* Blog Card */}
                    <div className="flex justify-center flex-wrap sm:mx-auto sm:mb-2 -mx-2 mt-4 mb-2">
                        {
                            
                            filteredPosts.map((post) => (
                                <div className="p-2 sm:w-1/4 w-full" key={post.$id}>
                                    <div className="container mx-auto px-4 bg-gray-200 p-2 rounded-lg">

                                        {/* Blog Thumbnail */}
                                        <img src={appwriteService.getFilePreview(post.thumbnail)} alt={post.title} className="w-20 mb-2 rounded-lg" />

                                        {/* Blog Date */}

                                        <p className="w-40 text-sm">{post.createdOn}</p>

                                        {/* Blog title */}

                                        <h1>{post.title}</h1>               
                                    </div>

                                </div>
                            ))
                        }

                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-gray-600">Powered by Techlibre</h1>
                    </div>

                </DialogBody>
            </Dialog>
        </Fragment>
    )
}

export default SearchDialog;