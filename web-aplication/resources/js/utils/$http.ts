import axios, {AxiosInstance} from "axios";
import {getAccessToken} from "./AuthService";

type Service = {
    axiosInstance:AxiosInstance | null,
    reInit:()=>Service,
    instance:()=>AxiosInstance
}

export default {
    axiosInstance:null,
    reInit(){
        this.axiosInstance = null;
        return this;
    },
    instance(){
        if (this.axiosInstance){
            return this.axiosInstance;
        }

        this.axiosInstance = axios.create({
            baseURL:import.meta.env.VITE_API_URL,
            headers:{
                "Authorization":`Bearer ${getAccessToken()}`,
            },
            withCredentials:false,
            withXSRFToken:false
        })

        return this.axiosInstance
    }

} as Service


