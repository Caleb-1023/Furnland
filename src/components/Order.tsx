import { useState,useEffect } from "react"
import { Col,Row,Tabs } from "react-bootstrap";
import Tab from "react-bootstrap/Tab"
import axios from "axios";
import { User } from "./Types";
import { API } from "../controller/api";
import {ordertype} from "./Types"
import Spinner from 'react-bootstrap/Spinner';

//import API from "../controller/api"
export const Order=()=>{
    const [order,setorder]=useState<ordertype[] | null>(null);
    const [data, setdata] = useState<User | null>(null);
    const [sent,setsent]= useState<ordertype[]| null>(null);
    const [delivered,setdelivered]= useState<ordertype[]| null>(null);
    const [confirmed,setconfirmed]= useState<ordertype[]| null>(null);
    const [pending,setpending]= useState<ordertype[]| null>(null);
     
    const config={
        headers:{
            Authorization:`Bearer ${data?.token}`
        }
       }
    const getorder=async()=>{

       try{
        const response = await axios.get("https://furnland.productkitchen.tech/order/myOrders",config)
        setorder(response.data)
        console.log(response.data)
        console.log(order)
       }catch(err){
            console.log(err)
       }
    }
//TO SORT ORDER
    useEffect(()=>{
        if(order){
            setsent(order.filter((element)=>{
                return element.hasBeenSent === true
            }))

            setconfirmed(order.filter((element)=>{
                return element.hasBeenConfirmed === true
            }))

            setdelivered(order.filter((element)=>{
                return element.hasBeenDelivered === true
            }))

            setpending(order.filter((element)=>{
                return element.hasBeenConfirmed === false && element.hasBeenDelivered === false && element.hasBeenSent === false
            }))
        }
    },[order])
    
//TO DELIVER
const deliver=async(id:number)=>{
    try{
        const response = API.post(`order/${id}/delivered`);
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
}

//TO GET TOKEN
    useEffect(() => {
        const dataa = window.localStorage.getItem("Data");
        if (dataa) {
          setdata(JSON.parse(dataa));
        }
      }, []);

    useEffect(()=>{
        if(data){
            getorder()
        }
        
    },[data])
    
    return(
        <>
        <Tabs className="mt-2" defaultActiveKey="pending">
            <Tab eventKey="pending" title="Pending">
            {order ?<>
        <Col>
           <Row className="p-3">

                {pending && pending.length > 0 ? pending.map((element)=>(
                    <Col key={element.orderedItemId} lg={12} className="mb-3 rounded border d-flex">
                        <div className="w-25">
                         <span>Hello</span>
                        </div>
                        <div className="p-2 d-flex flex-column pb-3  w-75">
                            <span className="mb-1">{element.itemName}</span>
                            <span className="mb-3 text-muted">Order {element.orderedItemId}</span>
                            {element.hasBeenDelivered ? <span>Delivered</span> : <span className="w-25 rounded text-center text-white bg-warning">PENDING</span>}
                        </div>
                    </Col>
                )) : <p>You have no order here</p>}
           </Row>
        </Col>
        </> : <div className="pt-5 text-center"><Spinner animation="border"/></div>
              }
            </Tab>
            <Tab eventKey="confirmed" title="Confirmed">
            {order ?<>
        <Col>
           <Row className="p-3">

                {confirmed && confirmed.length > 0 ? confirmed.map((element)=>(
                    <Col key={element.orderedItemId} lg={12} className="mb-3 rounded border d-flex">
                        <>
                        <div className="w-25">
                         <span>Hello</span>
                        </div>
                        <div className="p-2 d-flex flex-column pb-3  w-75">
                            <span className="mb-1">{element.itemName}</span>
                            <span className="mb-3 text-muted">Order {element.orderedItemId}</span>
                            <div className="d-flex justify-content-between ">
                            <div className="w-25 d-flex justify-content-between">
                            <span className="text-success">CONFIRMED</span>
                            {element.hasBeenConfirmed && <span className="w-25 rounded text-center text-success"><i className="bi bi-check-circle"></i></span> }
                            </div>
                            <div className="w-25 d-flex justify-content-between ">
                            {element.hasBeenSent ? <span className="w-25 rounded text-success">SENT</span> : <span className="w-25 rounded text-danger">SENT</span> }
                            {element.hasBeenSent ? <span className="w-25 rounded text-success"><i className="bi bi-check-circle"></i></span> : <span className="w-25 rounded text-danger"><i className="bi bi-x-circle"></i></span>}
                            </div>
                            <button disabled={element.hasBeenDelivered === true || element.hasBeenSent === false} type="button" onClick={async()=>{
                                    await deliver(element.orderedItemId)
                                    await getorder()
                            }} className="btn btn-success">DELIVERED</button>
                            </div>
                        </div>
                    </>
                    </Col>
                )) : <p>You have no order here</p>}
           </Row>
        </Col>
        </> : <div className="pt-5 text-center"><Spinner animation="border"/></div>
              }
            </Tab>
            {/* <Tab eventKey="sent" title="Sent">
            {order ?<>
        <Col>
           <Row className="p-3">

                {sent && sent.length > 0 ? sent.map((element)=>(
                    <Col key={element.orderedItemId} lg={12} className="mb-3 rounded border d-flex">
                        <div className="w-25">
                         <span>Hello</span>
                        </div>
                        <div className="p-2 d-flex flex-column pb-3  w-75">
                            <span className="mb-1">{element.itemName}</span>
                            <span className="mb-3 text-muted">Order {element.orderedItemId}</span>
                            {element.hasBeenDelivered ? <span>Delivered</span> : <span className="w-25 rounded text-center text-white bg-warning">PENDING</span>}
                        </div>
                    </Col>
                )) : <p>You have no order here</p>}
           </Row>
        </Col>
        </> : <div className="pt-5 text-center"><Spinner animation="border"/></div>
              }
            </Tab> */}
            <Tab eventKey="delivered" title="Delivered">
            {order ?<>
        <Col>
           <Row className="p-3">

                {delivered && delivered.length > 0 ? delivered.map((element)=>(
                    <Col key={element.orderedItemId} lg={12} className="mb-3 rounded border d-flex">
                        <div className="w-25">
                         <span>Hello</span>
                        </div>
                        <div className="p-2 d-flex flex-column pb-3  w-75">
                            <span className="mb-1">{element.itemName}</span>
                            <span className="mb-3 text-muted">Order {element.orderedItemId}</span>
                            <div className="d-flex justify-content-between ">
                            <div className="w-25 d-flex justify-content-between ">
                            <span className="text-success">CONFIRMED</span>
                            {element.hasBeenConfirmed && <span className="w-25 rounded text-center text-success"><i className="bi bi-check-circle"></i></span> }
                            </div>
                            <div className="w-25 d-flex justify-content-between ">
                            <span className="text-success">SENT</span>
                            {element.hasBeenSent && <span className="w-25 rounded text-center text-success"><i className="bi bi-check-circle"></i></span> }
                            </div>
                            <div className="w-25 d-flex justify-content-between ">
                            <span className="text-success">DELIVERED</span>
                            {element.hasBeenDelivered && <span className="w-25 rounded text-center text-success"><i className="bi bi-check-circle"></i></span> }
                            </div>
                            </div>
                        </div>
                    </Col>
                )) : <p>You have no order here</p>}
           </Row>
        </Col>
        </> : <div className="pt-5 text-center"><Spinner animation="border"/></div>
              }
            </Tab>
        </Tabs>
        
      
        </>
    )
}