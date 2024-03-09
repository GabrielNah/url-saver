import React, {FormEvent, useState} from 'react';
import $http from "@utils/$http"
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import {setAccessToken} from "../utils/AuthService";
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
        <div>
            <form onSubmit={login}>
                <input type="email" value={creds.email??""} onChange={(e)=>{
                    setCreds(p=>({...p,email:e.target.value??""}))
                }}/>
                <input type="password" value={creds.password??""} onChange={(e)=>{
                    setCreds(p=>({...p,password:e.target.value??""}))
                }}/>
                <button>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
