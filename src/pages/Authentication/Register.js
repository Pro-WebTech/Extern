import React from "react";
import { Jumbotron, Container, Row, Col, Card, CardGroup, CardText, CardBody } from "reactstrap"
import "../../assets/css/custom/register-page.css"
import { Link } from 'react-router-dom';
class Register extends React.Component {
  render() {
    return (
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <Jumbotron className="p-0 main-box">
              <h2 className="display-4 my-5 py-5 text-white">Welcome to Externship Finder</h2>
              <div className="my-5 text-white">
                <p className="select-font">Select account type</p>
              </div>
              <CardGroup>

                <Card>
                  <Link to="/studentregister">
                    <div className="justify-content-center d-flex card-img-box pt-4">
                      <img src="https://img.pngio.com/white-graduation-hat-png-graduation-cap-icon-png-free-png-images-graduation-cap-icon-png-920_960.png" className="card-img-student" alt="..." />
                    </div>
                    <CardBody>
                      <h5 className="card-text card-name">Student</h5>
                      <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                      <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
                    </CardBody>
                  </Link>

                </Card>
                <Card>
                  <Link to="/employerregister">
                    <div className="justify-content-center d-flex card-img-box">
                      <img src="https://thumbs.dreamstime.com/b/customer-customer-icon-147072097.jpg" className="card-img-employer" alt="..." />
                    </div>
                    <CardBody>
                      <h5 className="card-text card-name">Employer</h5>
                      <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                      <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
                    </CardBody>
                  </Link>
                </Card>
                <Card>
                  <Link to="/schoolregister">
                    <div className="justify-content-center d-flex card-img-box pt-2">
                      <img src="https://illustoon.com/photo/2878.png" className="card-img-school" alt="..." />
                    </div>
                    <CardBody>
                      <h5 className="card-text card-name">School</h5>
                      <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                      <CardText><small className="text-muted">Last updated 3 mins ago</small></CardText>
                    </CardBody>
                  </Link>
                </Card>
              </CardGroup>
            </Jumbotron>

          </Col>

        </Row>
      </Container>
    )
  }
}

export default Register;