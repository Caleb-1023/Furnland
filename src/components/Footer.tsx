import {Container,Row,Col} from "react-bootstrap"
import {Link} from "react-router-dom"
export const Footer=()=>{
    return(
        <>
        <div style={{background: "#03344F"}} >
            <Container>
                <Row className="gy-2 justify-content-between pt-5 pb-5">
                    <Col lg={3}>
                    <div>
                        <h6 className="text-white ps-4">FURNLAND</h6>
                        <p className="text-white ps-4">4517 Washington Ave. Manchester, Kentucky 39495</p>
                    </div>
                    </Col>

                <Col className=""lg={3}>
                <div className="">
                    <h6 className="ps-4 text-white">Quick links</h6>
                </div>
                <nav>
                    <ul style={{listStyle:"none"}}>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">About us</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Admin</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Buy online</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Sell furniture</a></li>
                    </ul>
                </nav>
                </Col>
                <Col className=""lg={3}>
                <div className="">
                    <h6 className="ps-4 text-white">Policy</h6>
                </div>
                <nav>
                    <ul style={{listStyle:"none"}}>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Terms & conditions</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Privacy policy</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Contact us</a></li>
                        
                    </ul>
                </nav>
                </Col>
                <Col className=""lg={3}>
                <div className="">
                    <h6 className="ps-4 text-white">Social</h6>
                </div>
                <nav>
                    <ul style={{listStyle:"none"}}>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Facebook</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">Instagram</a></li>
                        <li className="p-1"><a className="text-white" style={{textDecoration:"none"}} href="/">LinkedIN</a></li>
                        
                    </ul>
                </nav>
                </Col>
                </Row>
            </Container>
            
        </div>
        </>
    )
}