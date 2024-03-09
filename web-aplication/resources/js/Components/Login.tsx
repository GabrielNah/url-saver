import React, {FormEvent, useState} from 'react';

const Login = () => {

    let [creds,setCreds]=useState<{
        email:string,
        password:string
    }>({email:"",password:""})

    const login = (e:FormEvent)=>{
        e.preventDefault();

    }

    return (
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
            }}>
                <input type="email" value={creds.email??""} onChange={(e)=>{
                    setCreds(p=>({...p,email:e.currentTarget.value??""}))
                }}/>
                <input type="password" value={creds.password??""} onChange={(e)=>{
                    setCreds(p=>({...p,password:e.currentTarget.value??""}))
                }}/>
            </form>
        </div>
    );
};

export default Login;
