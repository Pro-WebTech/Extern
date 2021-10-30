import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, Button, Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle,
    CardTitle, CardText, Nav, TabPane
} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SimpleBar from "simplebar-react";

import Iframe from "../../components/Iframe";
import {getAuditoryDetail, getCompany} from "../../store/actions";
import {getCompanyDetail} from "../../axios/company";
import {getAuditoriaDetail} from "../../axios/auditoria";

class DetailAuditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Controle de auditorias",
                desk: "Selecione a auditoria que queira visualizar ou crie uma nova.",
                buttonTitle: ""
            },
            selectedCompany: {},
            menu1: false,
            menu2: false,

            selectedFiles: [],
            showBtn: false,

            activeTab: '1',
            paramID: props.match.params.detailID,
            periodoInicial: '',
            valorRecuperado: '',
            errosEncontrados: '',
            arquivos: [],
            malhas: [],

            iframeSource:'',
            iframeDescription:'',
        }
        this.toggleTab = this.toggleTab.bind(this);
    }

    componentDidMount() {
        this.props.getAuditoryDetail(this.state.paramID);

        getAuditoriaDetail(this.state.paramID).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;

            const data = response.data.result;
            let list_files = []
            if (data[0].list_files !== null) {
                var index = 0;
                data[0].list_files.forEach((element) => {
                    list_files.push({
                       value: element.type,
                       index: index
                    })
                    index ++;
                });
            }
            if (list_files.length === 0) {
                list_files.push({
                   value: "Nenhum documento foi enviado",
                   index: 0
                });
            }
            this.setState({
                periodoInicial: data[0].date_start,
                valorRecuperado: data[0].money_recovered_total === null ? '0' : data[0].money_recovered_total,
                errosEncontrados: 0,
                arquivos: list_files,
                malhas: data[0].malhas
            });

            this.showCompanyDetail(data[0].company_id);

        }).catch(error => {
            console.log('error', error);
        })
    }

    showCompanyDetail = (company_id) => {
        getCompanyDetail(company_id).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;

            const data = response.data.result;
            this.setState({selectedCompany: data[0]})

        }).catch(error => {
            console.log('error', error);
        })
    }

    toggleTab(index) {
        const {malhas} = this.state;
        malhas.forEach(element =>{
            if(element.id === index){
                this.setState({ iframeSource: element.metabase_sign_url});
                this.setState({ iframeDescription: element.description});
            }
        })
    }

    handleAcceptedFiles = files => {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: this.formatBytes(file.size)
            })
        );
        this.setState({selectedFiles: files, showBtn: true});
    };

    backToPreviousPage = () => {
        this.props.history.push("/audit-filter/" + this.state.selectedCompany.id);
    }

    render() {
        const {malhas, arquivos} = this.state;

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
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label style={{
                                                        fontFamily: "Arial",
                                                        fontWeight: 400,
                                                        fontSize: "14px",
                                                        lineHeight: "18px"
                                                    }}>CNPJ</Label>
                                                    <Input className="form-control" type="search" 
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
                                                    <Input className="form-control" type="search" 
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

                                    <CardBody> <CardTitle className="mb-6"
                                                          style={{
                                                              fontFamily: "Arial",
                                                              fontWeight: 700,
                                                              fontSize: "24px",
                                                              lineHeight: "24px"
                                                          }}>
                                        Detalhe da Auditoria
                                    </CardTitle>
                                        <Dropdown className="float-right" isOpen={this.state.menu2}
                                                  toggle={() => this.setState({menu2: !this.state.menu2})}>
                                            <DropdownToggle tag="i" className="arrow-none card-drop">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </DropdownToggle>
                                        </Dropdown>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>


                                            <CardBody>
                                                <Form>
                                                    <div
                                                        className="dropzone-previews mt-3"
                                                        id="file-previews"
                                                    >
                                                        <Card>
                                                            <Row className="mb-4">
                                                                <Col className="col-4">
                                                                    <Label style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 700,
                                                                        fontSize: "18px",
                                                                        lineHeight: "22.59px"
                                                                    }}>
                                                                        Periodo de Referencia</Label><br/>
                                                                    <label className="text-muted" style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "24px"
                                                                    }}>
                                                                        {this.state.periodoInicial}
                                                                    </label>
                                                                </Col>
                                                                <Col className="col-1"></Col>
                                                                <Col className="col-5">
                                                                    <Label style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 700,
                                                                        fontSize: "18px",
                                                                        lineHeight: "22.59px"
                                                                    }}>
                                                                        Arquivos selecionados</Label><br/>
                                                                    {arquivos.map((item, key) => (
                                                                        <Button
                                                                            color="info"
                                                                            size="lg"
                                                                            className="waves-effect waves-light mr-4"
                                                                            disabled
                                                                            key = {item.index}
                                                                        >
                                                                            {item.value}
                                                                        </Button>
                                                                    ))}
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="col-4">
                                                                    <Label style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 700,
                                                                        fontSize: "18px",
                                                                        lineHeight: "22.59px"
                                                                    }}>
                                                                        Total de erros encontrados</Label><br/>
                                                                    <label className="text-muted" style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "24px"
                                                                    }}>
                                                                        {this.state.errosEncontrados}
                                                                    </label>
                                                                </Col>
                                                                <Col className="col-1"></Col>
                                                                <Col className="col-4">
                                                                    <Label style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 700,
                                                                        fontSize: "18px",
                                                                        lineHeight: "22.59px"
                                                                    }}>
                                                                        Valor de credito recuperado nos
                                                                        cruzamentos</Label><br/>
                                                                    <label className="text-muted" style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "24px"
                                                                    }}>
                                                                        R$ {this.state.valorRecuperado}
                                                                    </label>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Row>
                                    </CardBody>
                                    <CardBody>
                                        <Row className="mt-0">
                                            <Col lg="4">
                                                <SimpleBar style={{maxHeight: "100%"}}>
                                                    <Card>

                                                        <CardBody><CardText><b>Auditorias realizadas</b></CardText>
                                                            <Nav pills className="flex-column" id="v-pills-tab"
                                                                 role="tablist" aria-orientation="vertical">
                                                                {
                                                                    malhas !== null &&
                                                                    malhas.map((item, key) =>
                                                                        <Button
                                                                            onClick={() => {
                                                                                this.toggleTab(item.id);
                                                                            }}
                                                                            color="primary"
                                                                            size="lg"
                                                                            block
                                                                            className="waves-effect waves-light"
                                                                            key = {item.id}
                                                                        >
                                                                            {item.name}
                                                                        </Button>
                                                                    )
                                                                }

                                                            </Nav>
                                                        </CardBody>


                                                    </Card>
                                                </SimpleBar>
                                            </Col>

                                            <Col lg="8">
                                                    {malhas !== null &&
                                                        <TabPane>
                                                            <Iframe source={this.state.iframeSource}
                                                                    title={this.state.iframeDescription}
                                                                    />
                                                        </TabPane>
                                                    }
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
                                    onClick={this.backToPreviousPage}
                                    style={{
                                        border: '2px solid', paddingLeft: "2em", paddingRight: "2em",
                                        fontFamily: "Arial", fontWeight: 400, fontSize: "18px", lineHeight: "22.59px"
                                    }}
                                >
                                    Voltar

                                </Button>
                            </FormGroup>

                            <FormGroup className="select2-container ml-2">
                            </FormGroup>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

const mapStatetoProps = state => {
    const {auditoryDetail} = state.Auditory;
    const {companies} = state.Company;
    return {auditoryDetail, companies};
}
export default withRouter(connect(mapStatetoProps, {getAuditoryDetail, getCompany})(DetailAuditScreen));
