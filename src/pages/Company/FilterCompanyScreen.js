import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, Table, Button, FormGroup, Input,
    Dropdown, DropdownToggle,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
// Redux
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getCompany} from "../../store/actions";

class FilterCompanyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Controle de Clientes",
                desk: "Selecione a Empresa que Gostaria de auditar.",
                buttonTitle: ""
            },
            companyData: [],
            job: "",
            company: "",

            modal_standard: false,

            menu1: false,
            menu2: false,

            paramID: props.match.params.companyID,
        };
    }

    componentDidMount() {
        this.props.getCompany();
    }

    cleanSearch = () => {
        this.setState({
            company: "",
            job: "",
        });
    }

    search = () => {
        this.props.getCompany();
    }

    handleJob = e => {
        this.setState({job: e.target.value});
    }

    handleCompany = e => {
        this.setState({company: e.target.value});
    };


    render() {
        // const dataLength = this.state.companyData.length;
        const companies = this.props.companies;
        companies.forEach(element => {
            element.editURL = "/audit-filter/" + element.id;
        });
        console.log(companies);
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title={this.state.breadcrumbItem.title} desc={this.state.breadcrumbItem.desk}
                                     buttonTitle={this.state.breadcrumbItem.buttonTitle} buttonLink=""/>

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
                                                    <Input className="form-control" type="search"
                                                           autoFocus
                                                           value={this.state.job}
                                                           onChange={this.handleJob.bind(this)}
                                                           placeholder="CNPJ"
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
                                                        onClick={this.search}
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
                                                        fontFamily: "Arial",
                                                        fontWeight: 700,
                                                        fontSize: "16px",
                                                        lineHeight: "18.7px"
                                                    }}>
                                                        <th className="col-1">Código</th>
                                                        <th className="col-2">CNPJ do Cliente</th>
                                                        <th className="col-7">Razão Social</th>
                                                        <th className="col-2">Ações</th>
                                                        {/* <Dropdown className="float-right" isOpen={this.state.menu2}
                                                                  toggle={() => this.setState({menu2: !this.state.menu2})}>
                                                            <DropdownToggle tag="i" className="arrow-none card-drop">
                                                                <i className="mdi mdi-dots-vertical"></i>
                                                            </DropdownToggle>
                                                        </Dropdown> */}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        companies.map((item,key ) =>
                                                            <tr style={{
                                                                fontFamily: "Arial",
                                                                fontWeight: 400,
                                                                fontSize: "14px",
                                                                lineHeight: "16px"
                                                            }}key= {item.id}>
                                                                <th>{item.id}</th>
                                                                <td style={{color: "#8ACB50"}}>{item.cnpj}</td>
                                                                <td className="text-muted">{item.razao_social}</td>
                                                                <td>
                                                                    <div className="button-items">
                                                                        <div onClick={() => {
                                                                            this.props.history.push(item.editURL)
                                                                        }} className="point">
                                                                            <i className="ri-play-fill"></i>
                                                                        </div>
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

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {companies} = state.Company;
    return {companies};
}
export default withRouter(connect(mapStatetoProps, {getCompany})(FilterCompanyScreen));
