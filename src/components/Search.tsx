/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import { API } from "../controller/api";
import url from "../Images/stockphoto.jpg"
import { productProps } from "./Types";
import { User } from "./Types";
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from "react-toastify";
//import { loginContext, userContext } from "./usecontext";
import { useNavigate } from "react-router-dom";

export const Search=()=>{
    const {idd}=useParams();
    const navigate = useNavigate();
    const [products,setproducts]=useState<productProps[] | null>(null)
    const [data,setdata]=useState<User| null>(null)

    const getproducts=async()=>{
        try{
            const response=await API.get(`item/search/${idd}`);
            console.log(response)
            setproducts(response.data);
            console.log({products})
            
        }
        catch(err){
            console.log(err);
        }
    }
    const postdata = async (id: number) => {
        try {
          const response = await API.post(
            `/item/itemSelect/${id}`,
            {},
          );
          //alert("Item successfully added")
          toast.success("Item added")
          console.log(response);
        } catch (error) {
          if(error){
            toast.warning("Error")
          }
        }
      };

      useEffect(()=>{
     const user=window.localStorage.getItem("Data")
    if(user){
   setdata(JSON.parse(user))
   
     }
     
     
  },[]) 
  
    useEffect(()=>{
        getproducts()
    },[idd])
    return(
        <>
        <div  className="bg-light">
      <div className="container pt-5">
        <div className="row gy-0">

        {products ? 
        <>
            {products.length > 0 ? 
            <>
            {products.map((element)=>(
            <div className="col-6 col-lg-3 " key={element.id}>
              {/* <Link className="text-decoration-none" to={`/products/${element.id}`}> */}
                <div style={{ height: "400px" }}>
                  <a className="text-decoration-none" href={`products/${element.id}`} >
                  <div className="h-50" style={{background:`linear-gradient( rgba(0,0,0,0.7), rgba(0,0,0, 0.7)) , url(${url}) center `}}></div>
                  <div className="row">
                    <div className="col-12">
                      <span className="text-dark">{element.itemName.toUpperCase()}</span>
                    </div>
                    <div className="col-12">
                      <span className="text-dark"># {element.itemPrice}</span>
                    </div>
                    <div className="col-12">
                      <span className="text-muted">
                        {element.itemDescription}
                      </span>
                    </div>
                    </div>
                    </a>
                    <div className="row">
                    <div className="col-12 pt-4">
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={async () => {
                           
                            data
                            ? await postdata(element.id)
                              : navigate("/login");
                          }}
                          style={{ backgroundColor: "#F66B0E" }}
                          className="w-50 text-white btn btn"
                        >
                          Add to cart
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
             ))}
            </> : <div className="text-center pb-5"><p>No result found</p></div>}
        </> :  <div className="text-center mt-5 pb-5"><Spinner animation="border"/></div>}

            </div>
            </div>
        </div>
        </>
    )
}