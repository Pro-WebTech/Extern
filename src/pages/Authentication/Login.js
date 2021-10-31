import React, { Component } from 'react';

import { Row, Col, Input, Button, Alert, Container, Label, FormGroup } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// actions
import { checkLogin, apiError } from '../../store/actions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "admin@gmail.com", password: "123456" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, values) {
        this.props.checkLogin(values, this.props.history);
    }

    componentDidMount() {
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }

    componentWillUnmount() {
        document.body.classList.remove("auth-body-bg");
    }
    
    render() {

        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/"><i className="mdi mdi-home-variant h2 text-white"></i></Link>
                </div>

                <div>
                    <Container fluid className="p-0">
                        <div className="no-gutters d-flex">
                            <div style={{ "width": "42%" }} className="left-side">
                                <div className="authentication-top">
                                    <div className="top-canva">
                                        <center className="h-100">
                                            <div className="top-canva-content d-flex">
                                                <div className="A-canva">P</div>
                                                <div className="A-canva-title">Extern</div>
                                            </div>
                                        </center>

                                    </div>
                                </div>

                                <div className="authentication-bg">
                                    <div className="point-box d-flex">
                                        <div className="point-box-vertical">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                        <div className="point-box-vertical">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                        <div className="point-box-vertical">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                        <div className="point-box-vertical">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                        <div className="point-box-vertical">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                        <div className="point-box-vertical m-0">
                                            <div className="point-canva"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                            <div className="point-canva-b"></div>
                                        </div>
                                    </div>

                                    <div className="authentication-bg-img">

                                    </div>
                                    <div className="title-box">
                                        <div className="title-one">
                                            Welcome<br />      
                                        </div>
                                        <Row></Row>
                                        <div className="title-content">
                                            This site is for students who want to join in medical extern in <br/>your free time
                                        </div>
                                    </div>

                                    <div className="double-rect"></div>
                                    <div className="double-round">
                                        <div className="double-round-in">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top-font">
                                Do you have an account?
                                <span>
                                    <Link to="/register" className=""> Register</Link>
                                </span>

                            </div>
                            <div className="right-side">
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={7}>
                                                <div>
                                                    <div className="text-center">
                                                        <h4 className="login-title-font">Login</h4>
                                                        <p className="login-title-content">Sign in to continue to Extern Finder.</p>
                                                    </div>

                                                    {/* {this.props. && this.props. ? <Alert color="danger">{this.props.loginError}</Alert> : null} */}
                                                    {this.props.loginError && this.props.loginError ? <Alert color="danger">"{this.props.loginError}"</Alert> : null}

                                                    <div className="p-2 mt-2">
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} >
                                                            <div className="name-form-font">
                                                                Username
                                                            </div>
                                                            <FormGroup className="">
                                                                <AvField autoFocus name="username" value={this.state.username} type="text" className=" auth-form-style" id="username" validate={{ email: true, required: true }} placeholder="Entre com seu usuário" />
                                                            </FormGroup>
                                                            <div className="name-form-font">
                                                                Password
                                                            </div>
                                                            <FormGroup className="">
                                                                <AvField name="password" value={this.state.password} type="password" className="auth-form-style" id="userpassword" placeholder="Digite sua senha de acesso" />
                                                            </FormGroup>

                                                            <div className="custom-control custom-checkbox">
                                                                <Input type="checkbox" className="custom-control-input remember-check" id="customControlInline" />
                                                                <Label className="custom-control-label remember-font" htmlFor="customControlInline">Remember me</Label>
                                                                <Link to="/forgot-password" className="forget-password float-right">Forgot your password?</Link>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="info" className="w-100 login-submit" type="submit">Log In</Button>
                                                            </div>

                                                            <Row className="mt-4 m-1 text-center">
                                                                <Col className="line-center">
                                                                </Col>
                                                                <Col style={{ fontSize: "16px" }}>
                                                                © 2021 Extern Finder
                                                                </Col>
                                                                <Col className="line-center">
                                                                </Col>
                                                            </Row>
                                                            {/* <Row className="mt-5">
                                                                <Col>
                                                                    <div className="icon-style float-left">
                                                                        <center>
                                                                            <img src={google} alt="" className="icon-size" />
                                                                        </center>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <center>
                                                                        <div className="icon-style">
                                                                            <center>
                                                                                <img src={facebook} alt="" className="icon-size" />
                                                                            </center>

                                                                        </div>
                                                                    </center>
                                                                </Col>
                                                                <Col>
                                                                    <div className="icon-style float-right">
                                                                        <center>
                                                                            <img src={apple} alt="" className="icon-size" />
                                                                        </center>
                                                                    </div>
                                                                </Col>
                                                            </Row> */}
                                                        </AvForm>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
