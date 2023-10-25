import axios from 'axios';
import { useEffect, useState } from 'react'
import {User} from "../components/Types"

 export const Get=async (urll:string)=>{
   // const [loading,isloading]=useState(true) 
    //const [lo]
            
            try{
                const response=await axios.get(urll);
                //isloading(false)
                //console.log(response);
                return response;

            }catch(err){
                console.log(err);
            }
        }

export const Getwithtoken=(url:string)=>{

    const [data, setdata] = useState<User | null>(null);
    const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      };
    const getwithtoken=async()=>{
        try{
            const response=await axios.get(url,config)
            //console.log((response))
            return response;
        }
        catch(err){
           console.log(err) 
        }
    }
    useEffect(() => {
        const dataa = window.localStorage.getItem("Data");
        if (dataa) {
          setdata(JSON.parse(dataa));
        }
      }, []);

    useEffect(()=>{
        if(data){
            getwithtoken()
        }
    },[data])


}
  
  

