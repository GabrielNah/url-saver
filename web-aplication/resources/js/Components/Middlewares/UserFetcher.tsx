import React, { useLayoutEffect, useRef, useState} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {Await, defer, Outlet, useLoaderData, useLocation} from "react-router-dom";
import {UserType} from "@js/Types";


const getUser = async ()=>{
    try{
        let {data:{user}}:AxiosResponse<{ user: UserType }> = await $http.instance().get("/me")
        return user
    }catch (e){
        return null
    }
}
export const FetchUser = ()=>{
   return defer({
       user:getUser()
   })
}

const UserFetcher = () => {

    const {user} = useLoaderData<{user:UserType | null}>()


    return (
        <React.Suspense
            fallback={<p>Loading...</p>}
        >
            <Await
                resolve={user}
            >
                {(user) => (
                    <Outlet context={{user:user}}/>
                )}
            </Await>
        </React.Suspense>
    );
};

export default UserFetcher;
