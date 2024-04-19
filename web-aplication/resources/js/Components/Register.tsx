import React, {FormEvent} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {setAccessToken} from "../utils/AuthService";
import {NavLink, useNavigate} from "react-router-dom";
import Input from "./Toolkit/Input";
import Button from "./Toolkit/Button";

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
        <>
            <section className="bg-gray-50 h-fit dark:bg-gray-900 rounded-lg">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto py-2  ">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form  onSubmit={register} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        email</label>
                                    <Input type={"email"} {...useInput("email",credentials,setCredentials)}/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <Input type={"password"} {...useInput("password",credentials,setCredentials)}/>

                                </div>
                                <div>
                                    <label htmlFor="confirm-password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                        password</label>
                                    <Input type={"password"} {...useInput("password_confirmation",credentials,setCredentials)}/>

                                </div>

                                <Button type="submit"
                                        className="w-full bg-sky-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                    an account
                                </Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <NavLink to={"/login"}
                                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                    here</NavLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Register;
