import { Themecontext } from "./Types";
import { Container, Row, Col } from "react-bootstrap";

export const Layout = ({ children }: Themecontext) => {
  return (
    <>
      <div className="bg-light">
        <Container>
          <Row className="pt-4 pb-5">
            <Col className="bg-white shadow " lg={3}>
              <h1>Hello</h1>
            </Col>
            <Col
              className="bg-white shadow ms-lg-2 border pb-3 border-white rounded "
              lg={8}
            >
                
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
