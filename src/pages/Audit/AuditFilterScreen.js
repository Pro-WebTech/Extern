import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, Table, Button, FormGroup, Label, Input,
    Dropdown, DropdownToggle,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

// Redux
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import {getCompany, getAuditory} from "../../store/actions";
import { getCompanyDetail } from "../../axios/company";

class AuditFilterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Controle de Auditorias",
                desk: "Selecione a Empresa que Gostaria de auditar.",
                buttonTitle: "Novo Registro"
            },
            companyData: [],
            selectedCompany: {},
            inital: "",
            social: "",
            initial: "",
            final: "",

            modal_standard: false,

            menu1: false,
            menu2: false,
            menu3: false,
            paramID: props.match.params.companyID,
        };
    }

    getAudit = () => {
        console.log("cl");
        this.props.getAuditory(this.state.paramID);
    }

    componentDidMount() {
        this.props.getCompany();
        this.props.getAuditory(this.state.paramID);

        getCompanyDetail(this.state.paramID).then( response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;

            const data = response.data.result;
            this.setState({selectedCompany: data[0]})

        }).catch(error => {
            console.log('error', error);
        })
    }

    backOtherScreen = () => {
        this.props.history.push('/company-filter');
    }
    cleanSearch = () => {
        this.setState({
            initial: "",
            social: "",
        });
    }
    handleInitial = e => {
        this.setState({initial: e.target.value});
    }

    handleSocial = e => {
        this.setState({social: e.target.value});
    };

    handleInitial = e => {
        this.setState({initial: e.target.value});
    }

    handleFinal = e => {
        this.setState({final: e.target.final});
    }

    render() {
        const linkURL = "/new-audit/" + this.state.paramID;
        const auditData = this.props.auditorias;

        auditData.forEach(element => {
            element.detailURL = "/detail-audit/" + element.id;
            const date_start = element.date_start;
            const date_end = element.date_end;
            if (date_start !== null)
                element.date_start_string = date_start.substring(8,10)+ "/" + date_start.substring(5, 7)+ "/" + date_start.substring(0, 4);
            else
                element.date_start_string = "";
            
            if (date_end !== null)
                element.date_end_string = date_end.substring(8,10)+ "/" + date_end.substring(5, 7)+ "/" + date_end.substring(0, 4);
            else 
                element.date_end_string = "";
        })

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title={this.state.breadcrumbItem.title} desc={this.state.breadcrumbItem.desk}
                                     buttonTitle={this.state.breadcrumbItem.buttonTitle} buttonLink={linkURL}/>

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
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>CNPJ</Label>
                                                    <Input className="form-control" type="input"
                                                           placeholder={this.state.selectedCompany.cnpj}
                                                           disabled="disabled"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <FormGroup className="select2-container">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Razao Social</Label>
                                                    <Input className="form-control" type="input"
                                                           placeholder={this.state.selectedCompany.razao_social}
                                                           disabled="disabled"
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
                                        <Dropdown className="float-right" isOpen={this.state.menu3}
                                                  toggle={() => this.setState({menu3: !this.state.menu3})}>
                                            <DropdownToggle tag="i" className="arrow-none card-drop">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </DropdownToggle>
                                        </Dropdown>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="2">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Periodo Inicial</Label>
                                                    <Input className="form-control" type="search"
                                                           value={this.state.initial}
                                                           onChange={this.handleInitial}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2">
                                                <FormGroup className="select2-container">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Razao Social</Label>
                                                    <Input className="form-control" type="search"
                                                           value={this.state.social}
                                                           onChange={this.handleSocial}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <FormGroup className="select2-container">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>Auditoria que contenha os arquivos</Label>
                                                    <div className="button-items">
                                                        <Row className="row">

                                                        </Row>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                            <Col lg="8">
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
                                                        onClick={this.getAudit}
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
                                <Card>
                                    <CardBody>
                                        <div className="table-rep-plugin">
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" responsive striped>
                                                    <thead>
                                                    <tr style={{
                                                        fontFamily: "Karla",
                                                        fontWeight: 700,
                                                        fontSize: "16px",
                                                        lineHeight: "18.7px"
                                                    }}>
                                                        <th className="col-3">Descrição Auditoria</th>
                                                        <th className="col-3">Data de inicio</th>
                                                        <th className="col-3">Data final de processamento</th>
                                                        <th className="col-2">Status</th>
                                                        <th className="col-1"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        auditData &&
                                                        auditData.map((item, key) =>
                                                            <tr style={{
                                                                fontFamily: "Karla",
                                                                fontWeight: 400,
                                                                fontSize: "14px",
                                                                lineHeight: "16px"
                                                            }}
                                                                key = {item.id}>
                                                                <th>{item.description}</th>
                                                                <td style={{color: "#8ACB50"}}>{item.date_start_string}</td>
                                                                <td className="text-muted">{item.date_end_string}</td>
                                                                <th>{item.status}</th>
                                                                <td>
                                                                    <div className="button-items">
                                                                        <Button
                                                                            color="light"
                                                                            size="sm"
                                                                        >
                                                                            <Link to={item.detailURL}
                                                                                  style={{color: '#AAA'}}>
                                                                                <i className="ri-clipboard-fill"></i>
                                                                            </Link>
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
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <FormGroup className="select2-container ml-2">
                                <Button
                                    color="info"
                                    outline
                                    size="md"
                                    className="btn-rounded"
                                    onClick={this.backOtherScreen}
                                    style={{
                                        border: '2px solid', paddingLeft: "2em", paddingRight: "2em",
                                        fontFamily: "Arial", fontWeight: 400, fontSize: "18px", lineHeight: "22.59px"
                                    }}
                                >
                                    Voltar
                                </Button>
                            </FormGroup>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {auditorias} = state.Auditory;
    const {companies} = state.Company;
    return {auditorias, companies};
}
export default withRouter(connect(mapStatetoProps, {getAuditory, getCompany})(AuditFilterScreen));
