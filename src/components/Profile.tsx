import { Container, Row, Col ,Navbar,Nav} from "react-bootstrap";
import Tab from "react-bootstrap/Tab"

import {Account} from "../components/Account";
import {Order} from "../components/Order";
import {Vendor} from "./Vendor"
import {Vendororder} from "./Vendororder"
import {useState,useEffect} from "react"
import { User } from "./Types";

export const Profile = () => {
  const [data, setdata] = useState<User | null>(null);

  const role=data?.role
  
  useEffect(() => {
    const dataa = window.localStorage.getItem("Data");
    if (dataa) {
      setdata(JSON.parse(dataa));
    }

    
  }, []);
 
  return (
    <>
      <div className="bg-light">
        <Tab.Container defaultActiveKey="account">
        <Row className="pt-4 pb-5">
        <Col className=" ms-2 " lg={3}>
          {/* <Navbar className="ps-2"> */}
          <div className="pb-5 bg-white shadow ">
          <Nav className="d-inline  w-100" >
            
              <Nav.Link eventKey="account" className="text-dark border-bottom"><span className="me-2"><i className="bi bi-person-circle"></i></span>My Furnland Account</Nav.Link>
              <Nav.Link eventKey="order" className="text-dark"><span className="me-2"><i className="bi bi-box2"></i></span>Order</Nav.Link>
              {data && role === "ROLE_VENDOR" ? <Nav.Link eventKey="vendor" className="text-dark"><span className="me-2"><i className="bi bi-box2"></i></span>Vendor</Nav.Link> : null}
          </Nav>
          </div>
          {/* </Navbar> */}
          </Col>
          <Col
              className="bg-white shadow ms-lg-2 border pb-3 border-white rounded "
              lg={8}
            >
              <Tab.Content>
                <Tab.Pane eventKey="account">
                  <Account/>
                </Tab.Pane>
                <Tab.Pane eventKey="order">
                  {data && role === "ROLE_VENDOR" ? <Vendororder/> : <Order/> }
                  
                </Tab.Pane>
                <Tab.Pane eventKey="vendor">
                  <Vendor/>
                </Tab.Pane>
              </Tab.Content>

              </Col>
          </Row>
        </Tab.Container>













        {/* <Container>
          <Row className="pt-4 pb-5">
            <Col className="bg-white shadow " lg={3}>
              <Navbar>
                <Nav className="d-inline  w-100">
                  
                  <Nav.Link onClick={()=> {
                    setaccount(true)
                    setorder(false)
                    setvendor(false)}} className="border-bottom"><span className="me-2"><i className="bi bi-person-circle"></i></span>My Furnland Account</Nav.Link>
                  
                  
                  <Nav.Link onClick={()=>{
                    setorder(true);
                    setaccount(false)
                    setvendor(false)
                  }}><span className="me-2"><i className="bi bi-box2"></i></span>Order</Nav.Link>

                  {data && role === 3 ? <Nav.Link onClick={()=>{
                    setorder(false);
                    setaccount(false)
                    setvendor(true)
                  }}><span className="me-2"><i className="bi bi-box2"></i></span>Vendor</Nav.Link>
                :null}
                </Nav>
              </Navbar>
            </Col>
            <Col
              className="bg-white shadow ms-lg-2 border pb-3 border-white rounded "
              lg={8}
            >
              {account ? <Account/> : null }
              {data && data.id === 1 ? <>
                {order ? <Order/> : null}
              </> :<>{order ? <Order/> : null}</> }
              {vendor ? <Vendor/> : null}
              
            </Col>
          </Row>
        </Container> */}
      </div>
    </>
  );
};
