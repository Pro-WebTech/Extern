import React, { Component } from 'react';

import { Row, Col, Button, Alert, Container, FormGroup, ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";

// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';
// action
import { forgetUser } from '../../store/actions';
import { postForgetPwd } from "../../axios/login";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        modal_success: false
    };

    this.backToLogin = this.backToLogin.bind(this);
  }

  requestForgetPassword = () => {
    postForgetPwd(this.state.email).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data;          
        this.setState({modal_success: true});
      }).catch((e) => {
        console.log('error', e);
      })
  }

  backToLogin() {
      this.props.history.push(`/login`);
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
                                            <div className="A-canva">A</div>
                                            <div className="A-canva-title">Audit</div>
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
                                        Auditoria digital <br />de forma inteligente
                                    </div>
                                    <div className="title-content">
                                        Auditoria digital utilizando Machine Learning e Analise de dados em um sistema contábil completo!
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
                        </div>
                        <div className="right-side">
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={7}>
                                            <div>
                                                <div className="text-center">
                                                    <h4 className="login-title-font">Esqueceu a senha.</h4>
                                                    <p className="login-title-content">Coloque o seu e-mail</p>
                                                </div>

                                                {/* {this.props. && this.props. ? <Alert color="danger">{this.props.loginError}</Alert> : null} */}
                                                {this.props.loginError && this.props.loginError ? <Alert color="danger">"{this.props.loginError}"</Alert> : null}

                                                <div className="p-2 mt-2">
                                                    <AvForm className="form-horizontal">
                                                        <div className="name-form-font">
                                                            E-mail
                                                        </div>
                                                        <FormGroup className="">
                                                            <AvField autoFocus 
                                                                name="email" 
                                                                value={this.state.email} 
                                                                type="text" 
                                                                className=" auth-form-style" 
                                                                id="email" 
                                                                validate={{ email: true, required: true }} 
                                                                onChange={(e) => this.setState({email: e.target.value})}
                                                                placeholder="Entre com seu e-mail" />
                                                        </FormGroup>

                                                        <div className="mt-4 text-center">
                                                            <Button color="info" className="w-100 login-submit" onClick={this.requestForgetPassword}>Recuperar senha</Button>
                                                        </div>
                                                        <div className="mt-4 text-center">
                                                            <Button color="white" className="w-100 login-submit" onClick={this.backToLogin}>Voltar</Button>
                                                        </div>
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

            <Modal isOpen={this.state.modal_success}>
                <ModalHeader>Foi enviada uma nova senha para o seu e-mail!</ModalHeader>
                <ModalBody>
                    <p>Dentro de alguns instantes vai chegar uma nova senha pra você</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="primary" className="waves-effect waves-light"
                        onClick={() => this.backToLogin()}
                    >
                        Voltar para o login.
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { message, forgetError, loading } = state.Forget;
  return { message, forgetError, loading };
}

export default withRouter(
  connect(mapStatetoProps, { forgetUser })(ForgetPasswordPage)
);
