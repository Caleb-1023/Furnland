import { Row, Container, Col } from "react-bootstrap";
import { User } from "./Types";
import { useState, useEffect } from "react";
import { productProps } from "./Types";
import { useNavigate } from "react-router-dom";
import { API } from "../controller/api";
import Spinner from 'react-bootstrap/Spinner';
export const Cart = () => {
  const navigate = useNavigate();

  const [subtotal, setsubtotal] = useState(0);
  const [data, setdata] = useState<User | null>(null);
  const [responsedata, setresponsedata] = useState<productProps[] | null>(null);


  const gett = async () => {
    try {
      const response = await API.get(
        "/users/cart",
        
      );
      console.log(response.data);
      setresponsedata(response.data.selectedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const post = async () => {
    try {
      const response = await API.post(
        "/order/fromCart",
        {}
        
      );
      window.location.reload();
      //navigate("/")
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const user = window.localStorage.getItem("Data");
    if (user) {
      setdata(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (data) {
      gett();
    }
  }, [data]);

  useEffect(() => {
    if (responsedata) {
      const ans = responsedata.reduce((act, init, index) => {
        return act + +init.itemPrice;
      }, 0);

      console.log(responsedata);
      setsubtotal(ans);
    }
  }, [responsedata]);

  return (
    <div style={{height:"100vh"}}>
      {/*  */}
      <Container className="border-bottom">
        <div className="text-center">
          <h3>Cart</h3>
          <hr style={{ padding: "0px", margin: "0px" }} />
        </div>
        <Row className="mt-3 mb-5">
          <Col xs={12} lg={7}>
            {responsedata && responsedata.length > 0 ? (
              responsedata ? (
                responsedata.map((element) => (
                  <div key={element.id}>
                    <Row className="border mb-3">
                      <Col lg={2}>
                        <div></div>
                      </Col>
                      <Col className="" lg={8}>
                        <div>{element.itemName}</div>
                      </Col>
                      <Col lg={2}>
                        <div className="text-end">{element.itemPrice}</div>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <div className="text-center"><Spinner animation="border"/></div>
              )
            ) : (
              <div className="text-center">
                <button
                  style={{ backgroundColor: "#F66B0E" }}
                  onClick={() => navigate("/products")}
                  className="btn text-white"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </Col>
          <Col className="h-75 border" lg={5}>
            <div className=" text-center">
              <h3>Order Summary</h3>
              <hr style={{ padding: "0px", margin: "0px" }} />
            </div>
            <Row>
              <Col>
                <div className="d-flex justify-content-between">
                  <h6>SUBTOTAL</h6>
                  <span>{subtotal}</span>
                </div>
                <div className="mt-3 text-center mb-3">
                  <button
                    onClick={() => {
                      if (data) {
                        post();
                      }
                    }}
                    disabled={responsedata?.length === 0}
                    style={{ backgroundColor: "#F66B0E" }}
                    className="w-75 text-white btn"
                  >
                    CHECKOUT
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
