import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, Table, Button, FormGroup, Input,
    Modal, ModalBody, ModalFooter, Dropdown, DropdownToggle, Alert
    // Pagination, PaginationItem, PaginationLink,
    // Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";


// Redux
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// or
// import { Pagination } from '@material-ui/lab';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Link} from "react-router-dom";

import {getCompany, deleteCompany} from "../../store/actions";

import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

class FilterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Controle de Clientes",
                desk: "",
                buttonTitle: "Novo Registro"
            },
            companyData: [],


            job: "",
            company: "",

            modal_standard: false,
            removeID: -1,

            menu1: false,
            menu2: false,
        };
        this.tog_standard = this.tog_standard.bind(this);
    }

    show_dialog = id => {
        console.log(id);
        this.setState({modal_standard: true});
        this.setState({removeID: id});
    }
    remove_item = () => {
        const {removeID} = this.state;
        console.log(removeID);
        this.props.deleteCompany(removeID, this.props.history);
        this.setState({modal_standard: false});
    }

    componentDidMount() {
        this.props.getCompany();
    }

    tog_standard() {
        this.setState(prevState => ({
            modal_standard: !prevState.modal_standard
        }));
        this.removeBodyCss();
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    cleanSearch = () => {
        this.setState({
            company: "",
            job: "",
        });
    }
    handleJob = e => {
        this.setState({job: e.target.value});
    }

    handleCompany = e => {
        this.setState({company: e.target.value});
    };


    render() {
        // const companies = this.state.companyData;
        const companies = this.props.companies;
        companies.forEach(element => {
            element.editURL = "/edit-company/" + element.id;
        });
        // console.log("-----------------", companies);
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title={this.state.breadcrumbItem.title} desc={this.state.breadcrumbItem.desk}
                                     buttonTitle={this.state.breadcrumbItem.buttonTitle} buttonLink="/create-company"/>

                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <Dropdown className="float-right" isOpen={this.state.menu1}
                                                  toggle={() => this.setState({menu1: !this.state.menu1})}>
                                            <DropdownToggle tag="i" className="arrow-none card-drop">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </DropdownToggle>
                                        </Dropdown>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="3">
                                                <FormGroup className="mr-2">
                                                    <CpfCnpj className="form-control" type="search"
                                                             value={this.state.job}
                                                             autoFocus
                                                             onChange={this.handleJob.bind(this)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="5">
                                                <FormGroup className="select2-container">
                                                    <Input className="form-control" type="search"
                                                           value={this.state.company}
                                                           onChange={this.handleCompany.bind(this)}
                                                           placeholder="Razao Social"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="2">
                                                <FormGroup className="select2-container">
                                                    <Button
                                                        color="info"
                                                        outline
                                                        size="md"
                                                        className="btn-rounded"
                                                        onClick={this.cleanSearch}
                                                        style={{
                                                            border: '2px solid',
                                                            paddingLeft: "2em",
                                                            paddingRight: "2em",
                                                            fontFamily: "Arial",
                                                            fontWeight: 400,
                                                            fontSize: "18px",
                                                            lineHeight: "22.59px",
                                                            width: "80%"
                                                        }}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </FormGroup>
                                            </Col>

                                            <Col lg="2">
                                                <FormGroup className="select2-container">
                                                    <Button
                                                        color="info"
                                                        size="md"
                                                        className="btn-rounded waves-effect waves-light"
                                                        onClick={this.cleanSearch}
                                                        style={{
                                                            border: '2px solid',
                                                            paddingLeft: "2em",
                                                            paddingRight: "2em",
                                                            fontFamily: "Arial",
                                                            fontWeight: 400,
                                                            fontSize: "18px",
                                                            lineHeight: "22.59px",
                                                            width: "80%"
                                                        }}
                                                    >
                                                        Consultar
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                {this.props.message && this.props.message ?
                                    <Alert color="success">"{this.props.message}"</Alert> : null}

                                <Card>
                                    <CardBody>

                                        <div className="table-rep-plugin">
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" responsive striped>
                                                    <thead>
                                                    <tr style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 700,
                                                        fontSize: "16px",
                                                        lineHeight: "18.7px"
                                                    }}>
                                                        <th className="col-1">Código</th>
                                                        <th className="col-2">CNPJ do Cliente</th>
                                                        <th className="col-7">Razão Social</th>
                                                        <th className="col-2">Ações</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        companies.map((item, key) =>
                                                            <tr style={{
                                                                fontFamily: "Arial",
                                                                fontWeight: 400,
                                                                fontSize: "14px",
                                                                lineHeight: "16px"
                                                            }} key={item.id}>
                                                                <th>{item.id}</th>
                                                                <td style={{color: "#8ACB50"}}>{item.cnpj}</td>
                                                                <td className="text-muted">{item.razao_social}</td>
                                                                <td>
                                                                    <div className="button-items">
                                                                        <Button
                                                                            color="light"
                                                                            size="sm"
                                                                        >
                                                                            <Link to={item.editURL}
                                                                                  style={{color: '#AAA'}}>
                                                                                <i className="ri-edit-line"></i>
                                                                            </Link>
                                                                        </Button>
                                                                        <Button
                                                                            color="light"
                                                                            size="sm"
                                                                            onClick={() => this.show_dialog(item.id)}
                                                                        >
                                                                            <i className="ri-delete-bin-fill"></i>
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <Row className="d-flex justify-content-center">

                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={4} xl={3} className="mt-4">

                                <Modal
                                    isOpen={this.state.modal_standard}
                                    toggle={this.tog_standard}
                                >
                                    <ModalBody>
                                        <h5>Deseja realmente remover este item?</h5>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            type="button"
                                            onClick={this.tog_standard}
                                            color="light"
                                            className="waves-effect"
                                        >
                                            Não
                                        </Button>
                                        <Button
                                            type="button"
                                            color="primary" className="waves-effect waves-light"
                                            onClick={() => this.remove_item()}
                                        >
                                            Sim
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {companies, message} = state.Company;
    return {companies, message};
}
export default withRouter(connect(mapStatetoProps, {getCompany, deleteCompany})(FilterScreen));
