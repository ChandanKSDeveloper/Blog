import React,{ useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
// import { AiOutlineShareAlt, AiOutlineSearch  } from 'react-icons/ai'
import {SearchDialog, ShareDialogBox} from '../index'
import { Navbar, Typography, IconButton,Avatar, Collapse } from "@material-tailwind/react";

const Nav = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [openNav, setOpenNav] = useState(false);

    // NavList
    // const navList = (
    //     <ul className="list-none mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    //         <Typography
    //             as="li"
    //             variant="small"
    //             color="blue-gray"
    //             className="p-1 font-normal"
    //             is
    //             >
    //                 <Link to={'/'} className="flex items-center" >
    //                     Home
    //                 </Link>
    //         </Typography>

    //         <Typography
    //             as="li"
    //             variant="small"
    //             color="blue-gray"
    //             className="p-1 font-normal ">
    //                 <NavLink to={'/allblogs'} className={({ isActive }) => (isActive ? "flex items-center text-blue-500" : "hidden")}>
    //                     Blogs
    //                 </NavLink>
    //         </Typography>

    //         <Typography
    //             as="li"
    //             variant="small"
    //             color="blue-gray"
    //             className="p-1 font-normal ">
    //                 <Link to={'/adminlogin'} className={({ isActive }) => (isActive ? "flex items-center text-blue-500" : "hidden")}>
    //                     Admin Login
    //                 </Link>
    //         </Typography>
    //     </ul>
    // )

    const navList = [
        {
            name:'Home',
            slug:'/',
            active: true
        },
        {
            name: "Blogs",
            slug: "/allblogs",
            active: !authStatus, 
            //make the authStatus here true by removing "!" 
        },
        {
            name: "Admin Login",
            slug: "/login",
            active: !authStatus,
        },

    ]
    return (
        <div>
            {/* Navbar */}
            <Navbar
                className="sticky inset-0 z-20 h-max max-w-full bg-[#9ca1ff] border-none rounded-none py-2 px-4 lg:px-8 lg:py-2"
                >

                {/* Desktop View */}
                <div className="flex items-center justify-between text-blue-gray-900">

                    {/* Home Page Link */}

                    <Link to={'/'}>
                    <Typography
                            as="span"
                            className="mr-4 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"
                           
                        >
                            {/* Logo Image  */}
                            <img
                                className=' w-10 h-10 '
                                src='https://cdn-icons-png.flaticon.com/128/3685/3685253.png'
                            />
                            {/* Logo Text  */}
                            <span>
                                Tech Blog
                            </span>
                        </Typography>
                    </Link>

                    {/* All Items */}
                    <div className="flex items-center gap-4">
                        <ul className="lg:flex gap-4 hidden">
                            {navList.map((item) => item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(item.slug)
                                            }}

                                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"    
                                        >
                                        {item.name}

                                    </button>

                                </li>
                            ) : null )}
                        </ul>

                        {/* Search Icon */}
                        <div className="hidden lg:block">
                            <SearchDialog />
                        </div>

                        {/* Share Icon */}
                        <div className="hidden lg:block">
                        <ShareDialogBox />
                        </div>

                        {/* Admin Profile Pic */}
                        {
                            // make the authStatus here true by removing "!". since we want that we user admin login, it show dashboard icon 
                            !authStatus && (
                                <div>
                                    <Link to={'/dashboard'}>
                                        
                                        <div className="">
                                            <Avatar
                                                key={1}
                                                src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                                alt="avatar"
                                                withBorder={true}
                                                className="p-0.5 text-red-500 w-10 h-10 hover:scale-125 duration-200"
                                                
                                            />
                                        </div>
                                    </Link>
                                </div>
                            )
                        }

                        {/* Mobile Toggle */}
                        <div className="lg:hidden">
                        <IconButton
                                className="ml-auto h-10 w-10 border-2 border-white rounded-lg"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>

                        

                    </div>



                </div>


                {/* Mobile View */}
                <Collapse open={openNav}>
                    <ul className="flex flex-col text-black w-100 gap-4">
                        {navList.map((item) => item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenNav(false); // Close nav on item click
                                        navigate(item.slug);
                                    }}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null)}
                    </ul>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Nav;