import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {IoReload } from 'react-icons/io5'
const Protected = ({children, authentication = true}) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        const checkAuth = async () => {
            if (authentication && !authStatus) {
                navigate('/adminlogin');
            } else if(!authentication && authStatus){
                navigate('/dashboard')
            } else {
                setLoader(false);
            }
        }
        checkAuth();
        // if(authentication && authStatus!==authentication){
        //     navigate('/adminlogin')
        // } else if(!authentication && authStatus !== authentication){
        //     navigate('/dashboard')
        // }
        // setLoader(false);
    },[authStatus,navigate,authentication])

    return loader ? <div>
        <IoReload className="animate-spin"/>
    </div> : <>{children}</> 

}

export default Protected;