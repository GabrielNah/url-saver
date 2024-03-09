import React, { useLayoutEffect, useRef, useState} from 'react';
import $http from "@utils/$http"
import {AxiosResponse} from "axios";
import {Outlet, useLocation} from "react-router-dom";
import {UserType} from "@js/Types";


const UserFetcher = () => {

    let [fetching,setFetching] = useState(true)
    let User = useRef<UserType | null>(null)
    const { pathname } = useLocation();

    useLayoutEffect(()=>{

        setFetching(true)

        Promise.all(
            [$http.instance().get("/me")
                .then(({data: {user}}: AxiosResponse<{ user: UserType }>) => {
                    if (!user) {
                        throw new Error("Something went wrong.");
                    }

                    User.current = user
                })
                .catch((e) => {
                    User.current = null
                })
            ])
            .then(() => setFetching(false))

    },[pathname])
    //TODO  optimize navigation

    return (
        fetching ? "fetching" : <Outlet context={{user:User.current}}/>
    );
};

export default UserFetcher;
