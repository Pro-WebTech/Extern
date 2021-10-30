import React, { Component } from "react";

import {
    Row, Col, Card, CardTitle, CardBody, Container, Button, FormGroup, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Label
} from "reactstrap";


// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// or
// import { Pagination } from '@material-ui/lab';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { postAboutMe, postChangeProfile } from '../../axios/login';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Editar informações do Perfil",
                desk: ""
            },
            user_id: '',
            user_name: '',
            currently_password: '',
            new_password: '',
            confirm_new_password: '',
            modal_success: false,
            modal_error: false,
            modal_error_text: ''
        }

        
    }

    componentDidMount() {
        postAboutMe().then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            const data = response.data.result;
            this.setState({
                user_id: data[0].id,
                user_name: data[0].name,
            });
        }).catch(error => {
            console.log('error', error);
        })
    }

    toggleModalSuccess = () => {
        this.setState({
            modal_success: !this.state.modal_success
        })
    }
    toggleModalError = () => {
        this.setState({
            modal_error: !this.state.modal_error
        })
    }

    validateInformations = () => {
        if (this.state.user_id === null) {
            return false;
        }

        if (this.state.user_name === '') {
            this.setState({
                modal_error_text: 'Coloque o nome do usuário.'
            });
            this.toggleModalError();
            return false;
        }

        if (this.state.currently_password !== '') {

            if (this.state.new_password === '') {
                this.setState({
                    modal_error_text: 'Coloque a sua nova senha.'
                });
                this.toggleModalError();
                return false;
            }
            
            if (this.state.confirm_new_password === '') {
                this.setState({
                    modal_error_text: 'Coloque a confirmação da nova senha.'
                });
                this.toggleModalError();
                return false;
            }

            if (this.state.new_password !== this.state.confirm_new_password) {
                this.setState({
                    modal_error_text: 'Nova senha e confirmação de nova senha, não são as mesmas.'
                });
                this.toggleModalError();
                return false;
            }
            return true;
        } else {
            return true;
        }
    }
    salveProfileInformations = () => {
        if (this.validateInformations()) {
            postChangeProfile(
                this.state.user_name,
                this.state.currently_password,
                this.state.new_password,
                this.state.confirm_new_password
            ).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                this.toggleModalSuccess();
            }).catch(e => {
                this.setState({
                    modal_error_text: 'Erro de comunicação. Tente novamente mais tarde.'
                });
                this.toggleModalError();
                console.log('error', e);
            });
        }
    }

    redirectToDashboard() {
        setTimeout(() => this.goToDashboard(), 5000);
    }
    goToDashboard = () => {
        this.props.history.push(`/dashboard`);
    }

    validate = (user_name) => {
        return {
            user_name: user_name.length === 0,
        };
    }

    render() {
        const errors = this.validate(this.state.user_name);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title={this.state.breadcrumbItem.title} desc={this.state.breadcrumbItem.desk}
                            buttonTitle="" />
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <Row style={{ alignItems: 'center', marginTop: "2em", mraginBottom: "2em" }}>
                                            <Col lg="8">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Nome</Label>
                                                    <Input 
                                                        className={errors.user_name ? "form-control error" : "form-control"}
                                                        autoFocus
                                                        type="search" 
                                                        placeholder="Nome"
                                                        onChange={(e) => this.setState({ user_name: e.target.value })}
                                                        value={this.state.user_name}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-6"
                                                    style={{
                                                    fontFamily: "Arial",
                                                    fontWeight: 700,
                                                    fontSize: "24px",
                                                    lineHeight: "24px"
                                                    }}>
                                            Alterar senha
                                        </CardTitle>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Senha Atual</Label>
                                                    <Input className="form-control" 
                                                        autoFocus
                                                        type="password" 
                                                        placeholder="Senha atual"
                                                        onChange={(e) => this.setState({ currently_password: e.target.value })}
                                                        value={this.state.currently_password}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Nova senha</Label>
                                                    <Input className="form-control" 
                                                        autoFocus
                                                        type="password" 
                                                        placeholder="Nova senha"
                                                        onChange={(e) => this.setState({ new_password: e.target.value })}
                                                        value={this.state.new_password}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Confirmar nova senha</Label>
                                                    <Input className="form-control" 
                                                        autoFocus
                                                        type="password" 
                                                        placeholder="Confirmar nova senha"
                                                        onChange={(e) => this.setState({ confirm_new_password: e.target.value })}
                                                        value={this.state.confirm_new_password}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-between'>
                            <FormGroup className="select2-container ml-2">
                                <Button
                                    color="info"
                                    outline
                                    size="md"
                                    className="btn-rounded"
                                    onClick={this.goToDashboard}
                                    style={{
                                        border: '2px solid', paddingLeft: "2em", paddingRight: "2em",
                                        fontFamily: "Arial", fontWeight: 400, fontSize: "18px", lineHeight: "22.59px"
                                    }}
                                >Voltar</Button>
                            </FormGroup>
                            {
                                <FormGroup className="select2-container ml-2">
                                    <Button
                                        color="primary"
                                        size="md"
                                        className="waves-effect waves-light mr-1"
                                        onClick={this.salveProfileInformations}
                                        disabled={!isEnabled}
                                        style={{
                                            border: '2px solid',
                                            paddingLeft: "2em",
                                            paddingRight: "2em",
                                            fontFamily: "Arial",
                                            fontWeight: 400,
                                            fontSize: "18px",
                                            lineHeight: "22.59px"
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                </FormGroup>
                            }
                        </Row>
                    </Container>
                </div>
                <Modal isOpen={this.state.modal_success}>
                    <ModalHeader>Alteração realizada com sucesso!</ModalHeader>
                    <ModalBody>
                        <p>Os dados do seu perfil foram atualizados. </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={() => this.goToDashboard()}
                        >
                            Voltar para tela inicial.
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal_error}>
                    <ModalHeader>Erro ao alterar suas informações!</ModalHeader>
                    <ModalBody>
                        <p>{this.state.modal_error_text} </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={() => this.toggleModalError()}
                        >
                            Fechar
                        </Button>
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        )
    }
}

const mapStatetoProps = state => {
    return {};
}
export default withRouter(connect(mapStatetoProps, {})(Profile));