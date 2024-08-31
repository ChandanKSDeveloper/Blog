import React, { useState } from "react";
import { Typography, Button, Input, Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Layout } from "../../../components";


const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async(e) => {
        e.preventDefault();
        if(!email || !password){
            return toast.error("Fill all required fields");
        }

        try {
            
        } catch (error) {
            
        }
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
                    <form className="flex flex-col gap-4">
                        {/* First Input */}
                        <div>

                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login Button */}
                        <Button
                            onClick={login}>
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