import image from "../Images/unsplash_IH7wPsjwomc.png";
import url from "../Images/stockphoto.jpg";
//import imagee from "../Images/Rectangle 5.jpg"
import { Link } from "react-router-dom";
// import { Get } from "./Axiosoperations";
import { productProps, User } from "./Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {API} from ".././controller/api"
import Spinner from "react-bootstrap/Spinner";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "react-toastify";
export const Home = () => {
  const navigate = useNavigate();

  const [responsedata, setresponsedata] = useState<productProps[] | null>(null);
  const getresponse = async () =>{
    try{
      const response = await API.get("item/0/4");
      setresponsedata(response?.data.content)
    }
    catch(err){
      console.log(err)
    }
  }
  // const getresponse = async () => {
  //   const response = await Get("https://test-furn.herokuapp.com/item/0/4");
  //   setresponsedata(response?.data.content);
  // };

  useEffect(() => {
    getresponse();
  }, []);

  //
  const [data, Setdata] = useState<User | null>(null);
  useEffect(() => {
    const dataa = window.localStorage.getItem("Data");
    if (dataa) {
      Setdata(JSON.parse(dataa));
    }
  }, []);

  const postdata = async (id: number) => {
    try {
      const response = await API.post(
        `https://test-furn.herokuapp.com/item/itemSelect/${id}`,
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
  return (
    <div>
      <div className="bg-light">
        <div className="container bg-light">
          <div className="row justify-content-center">
            <div className="col-10 p-5">
              <div className="text-center mt-5">
                <h1 style={{ color: "#054C73" }}>
                  Amazing furniture to fit your home
                </h1>
              </div>
              <div className="text-center mb-5 mt-5">
                <p className="text-muted">
                  We think the chair is the most important piece of furniture in
                  your home because if you love the chair you are sitting on,
                  chances are you will love the rest of the room{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="row">
          <div className="col-12">
            <div
              className="bg-image"
              style={{
                background: `url(${image}),50px 50px/50px 50px , fixed`,
                height: "700px",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h1 style={{ color: "#054C73" }}>Services</h1>
            </div>
            <div className="pt-5">
              <h3>Explore our modern furniture</h3>
              <p className="text-muted mt-3">
                Comfort is key and what you feel about your chair will affect
                how you feel and your mood.It makes people at ease and feel like
                they want to open up.Since the online marketplace can be a scary
                place, the presence of customer reviews on an online store helps
                establish authenticity, confidence and trust among shoppers
              </p>
            </div>

            <div className="mt-5 row ">
              <div className="col-4 ">
                <h1>1.8 M</h1>
                <p>Website users</p>
              </div>
              <div className="col-4  text-center">
                <h1>1.2 M</h1>
                <p>Star Rating</p>
              </div>
              <div className="col-4 text-end">
                <h1>10 +</h1>
                <p>Year of company </p>
              </div>
            </div>
            <div className="mt-4 col-4 ">
              <button
                onClick={() => navigate("/products")}
                type="button"
                style={{
                  height: "50px",
                  backgroundColor: "#F66B0E",
                  border: "orange",
                }}
                className="w-100  btn btn-primary"
              >
                Shop now
              </button>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="row h-100">
              <div className=" align-items-end col-6">
                <div
                  className="h-50   "
                  style={{ background: ` url(${url}) center ` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top mb-5">
        <div className="container p-5">
          <div className="row mb-5 ">
            <div className="col">
              <div className="text-center">
                <h1 style={{ color: "#054C73" }}>
                  Sell your Furnitures online
                </h1>
                <p className="text-muted mt-3">
                  With Furnland you can sell your furnitures online with ease
                </p>
              </div>
            </div>
          </div>

          <div className={data?.role === "ROLE_VENDOR"? "row justify-content-around  " : "row justify-content-between"}>
          {data?.role !== "ROLE_VENDOR" ?
            <div className="seller col-lg-3 border pt-5 pb-5 ">
              
              <Link
                to="/vendorregistration"
                className="text-decoration-none   "
              >
                <div className="container ">
                  <div className="row ">
                    <div className="text-center text-dark">
                      <h4>Become a seller</h4>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-muted">
                        The perfect mix of style that complements the room's
                        style.The perfect mix of style that complements the
                        room's style.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div> : null}

            <div className="col-lg-3 pt-5 pb-5 border bg-light  ">
              <div className="container">
                <div className="row ">
                  <div className="text-center">
                    <h4>Upload your goods</h4>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-muted">
                      The perfect mix of style that complements the room's
                      style.The perfect mix of style that complements the room's
                      style.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 border pt-5 pb-5 bg-light ">
              <div className="container">
                <div className="row">
                  <div className="text-center">
                    <h4>Earn some income</h4>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-muted">
                      The perfect mix of style that complements the room's
                      style.The perfect mix of style that complements the room's
                      style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border" style={{ height: "" }}>
        <div className="container p-5">
          <div className="row">
            <div className="col-12 col-lg-6">
              <h1 style={{ color: "#054C73" }}>Best Selling Product </h1>
            </div>
            <div className=" col-12 col-lg-6">
              <div className="mt-3 text-end">
                <Link
                  className="h4 "
                  style={{ color: "#F66B0E" }}
                  to="/products"
                >
                  See all products
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mt-1 gx-5 gy-5 ">
            {responsedata ? (
              responsedata.map((element) => (
                <div className="col-lg-6 col-12" key={element.id}>
                  <div
                    style={{
                      height: "250px",
                      background: ` url(${url}) center `,
                    }}
                  >
                    
                    <div className="row  h-100 align-items-end justify-content-center">
                      <div className=" bg-white col-10">
                        <div>
                          <span>{element.itemName}</span>
                        </div>

                        <div className="text-end">
                          <button
                            type="button"
                            style={{ backgroundColor: "#F66B0E" }}
                            className="btn btn-sm text-white"
                            onClick={async () => {
                           
                              data
                              ? await postdata(element.id)
                                : navigate("/login");
                            }}
                          >
                            Add to cart
                          </button>
                        </div>
                        <div>
                          <span>Price: #{element.itemPrice}</span>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center"><Spinner animation="border"/></div>
              
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};
