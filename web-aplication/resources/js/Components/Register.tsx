import React, {FormEvent} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {setAccessToken} from "../utils/AuthService";
import {useNavigate} from "react-router-dom";

type Credentials = {
    email:string,
    password:string,
    password_confirmation:string,
}

    const useInput = <K extends keyof Credentials>(key:K,creds:Credentials,setCreds):{
        value:Credentials[K],
        onChange:(e:InputEvent)=>void,
        placeholder:K,
    }=>{
        return {
            value:creds[key],
            placeholder:key,
            onChange:(e:InputEvent)=>{
                setCreds(p=>({...p,[key]:e.target.value ?? ""}))
            }
        }
    }
const Register = () => {

    const [credentials,setCredentials] = React.useState<Credentials>({
        email:"",
        password:"",
        password_confirmation:"",
    })

    const navigate = useNavigate()

    const register = (e:FormEvent)=>{
        e.preventDefault();

        $http.instance().post("/register",credentials).then(({data:{token}}:AxiosResponse<{token:string}>)=>{
            setAccessToken(token)
            $http.reInit()
            navigate("/dashboard")
        })
    }

    return (
        <form onSubmit={register}>
            Register page
            <input type="email" {...useInput("email",credentials,setCredentials)}/>
            <input type="password" {...useInput("password",credentials,setCredentials)}/>
            <input type="password" {...useInput("password_confirmation",credentials,setCredentials)}/>
            <button>Send</button>
        </form>
    );
};

export default Register;
