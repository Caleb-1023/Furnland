import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { API } from "../controller/api";
import {Container,Row,Col} from "react-bootstrap";
export const Itempage=()=>{
    const {id} = useParams()
    const getItem=async()=>{
        try{
            const response =await API.get(`/item/items/${id}`);
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getItem();
    })
    return(
        <>
        <div>
           He
        </div>
        </>

    )
}