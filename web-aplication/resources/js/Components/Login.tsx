import React, {FormEvent, useState} from 'react';
import $http from "@utils/$http"
import {NavLink, useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import {setAccessToken} from "../utils/AuthService";
import Input from "./Toolkit/Input";
const Login = () => {

    let [creds,setCreds]=useState<{
        email:string,
        password:string
    }>({email:"",password:""})

    const navigate = useNavigate()

    const login = (e:FormEvent)=>{
        e.preventDefault();
        $http.instance().post("/login",creds)
            .then(({data:{token}}:AxiosResponse<{token:string}>)=>{
                setAccessToken(token)
                $http.reInit()
                navigate("/dashboard")
            })
    }

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <Input type={"email"} value={creds.email} onChange={e=>setCreds(p=>({...p,email:e.target.value??""}))}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <Input type={"password"} value={creds.password} onChange={e=>setCreds(p=>({...p,password:e.target.value??""}))}/>

                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                    <NavLink className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       to={'/register'}>
                        Already a member?
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
