import axios from "axios";
import {User} from ".././components/Types"
// import {useState} from "react"

const data : User | null = JSON.parse(localStorage.getItem("Data") as string);

export  const API= axios.create({
    baseURL: 'https://furnland.productkitchen.tech/',
    headers : {
        "Content-type" : "application/json",
        Authorization : `Bearer ${data?.token}`,
        "Access-Control-Allow-Origin": "*",

    }
})

// export const Api=()=>{
//     const[token,settoken]=useState<string|null>(null)
//     const data = window.localStorage.getItem("Data");
//     settoken(JSON.parse(data as string).token)
// }


