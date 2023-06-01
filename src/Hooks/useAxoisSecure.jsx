import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAxoisSecure = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()

    const axoisSecure = axios.create({
        baseURL : 'http://localhost:5000',
    })

    useEffect(()=>{
        axoisSecure.interceptors.request.use((config)=> {

            const token = localStorage.getItem('access-token')
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
 })
    axoisSecure.interceptors.response.use(
        (response)=> response,
        async (error)=> {
            if(error.response && (error.response.status === 401 || error.response.status ===403)){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)

        }
    
    )

    },[logOut,navigate,axoisSecure])

    return [axoisSecure]
};

export default useAxoisSecure;