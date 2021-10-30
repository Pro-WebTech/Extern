import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, Button, Form, FormGroup, Label, Input,
    Dropdown, DropdownToggle,
    CardTitle, ModalHeader, ModalBody, ModalFooter, Modal,
    InputGroup, Table
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import {Link} from "react-router-dom";
// import { TRUE } from "node-sass";
import Dropzone from "react-dropzone";
// Redux
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {uploadFile, createAuditory, getCompany} from "../../store/actions";
import {getCompanyDetail} from "../../axios/company";
import {createAuditApi, createLiminares} from "../../axios/auditoria";
import Constants from "../../constants/Constants";

import DatePicker from "react-datepicker";

class NewAuditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Controle de auditorias",
                desk: "Selecione a auditoria que queira visualizar ou crie uma nova.",
                buttonTitle: ""
            },
            menu1: false,
            menu2: false,
            selectedCompany: {},
            selectedFiles: [],
            showBtn: false,

            formFiles: [],
            description: "",
            modal_sucess: false,

            paramID: props.match.params.companyID,

            upload_path_type: [],
            fileName: "",

            modal_standard: false,
            newLiminar: [],
            newLiminarDescription:"",
            start_date: new Date(),
            end_date:new Date(),
            newLiminarID: 0
        }
        this.tog_standard = this.tog_standard.bind(this);
    }

    tog_standard() {
        this.setState(prevState => ({
            modal_standard: !prevState.modal_standard
        }));
    }

    show_dialog = () => {
        this.setState({modal_standard: true});
    }

    componentDidMount() {
        this.showCompanyDetail(this.state.paramID);
        
    }

    redirectToAuditFilter = () => {
        const backUrl = "/audit-filter/" + this.state.paramID;
        this.props.history.push(backUrl);
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

    handleDescription = e => {
        this.setState({description: e.target.value})
    }
    handleAddAudit = () =>{
        var { newLiminar, newLiminarID, newLiminarDescription, start_date, end_date } = this.state;
        newLiminar.push({
            "id": newLiminarID,
            "description": newLiminarDescription,
            "start_date": start_date,
            "end_date": end_date,
            "start_date_string": start_date.toDateString(),
            "end_date_string": end_date.toDateString()
        }) 
        newLiminarID ++;
        console.log("--------------", newLiminar);
        this.setState({newLiminar, newLiminarID})
        
    }
    removeAudit = (id) =>{
        const audit = [];
        const {newLiminar} = this.state;
        newLiminar.forEach(element =>{
            if (element.id !== id){
                audit.push(element);
            }
        })
        this.setState({newLiminar: audit});
    }
    handlenewLiminarDescription = e =>{
        this.setState({newLiminarDescription: e.target.value})
    }
    handleStartDate = date => {
        this.setState({start_date: date});
    }
    handleEndDate = date => {
        this.setState({end_date: date});
    }
    handleAcceptedFiles = files => {
        const {formFiles, selectedFiles} = this.state;
        var fileName= "";
        files.map(file => {
            selectedFiles.push(file);
            formFiles.push(file);
            fileName = file.name;
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: this.formatBytes(file.size)
            })
            return formFiles;
        });
        
        this.setState({selectedFiles: selectedFiles, fileName: fileName, showBtn: true});
        this.setState(formFiles);

        let formData = new FormData();
        for (let i = 0; i < this.state.formFiles.length; i++) {
            let file = this.state.formFiles[i];
            
            formData.append("file", file);
        }
        this.props.uploadFile(formData);
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.upload_file_status !== this.props.upload_file_status){
            if(this.props.upload_file_status === Constants.Status.SUCCESS){
                const { upload_path_type, fileName } = this.state;
                upload_path_type.push ({
                    fileName: fileName,
                    path: this.props.upload_path,
                    type: this.props.upload_type
                });

                this.setState({ upload_path_type});
            }
        }
    }
    handleDelectFile = fileName => {
        const files = [];
        const newPaths = []
        const {selectedFiles, upload_path_type} = this.state;
        selectedFiles.map(file => {
            if (file.name !== fileName) {
                files.push(file);
            }
            return files;
        });
        upload_path_type.map(element =>{
            if (element.fileName !== fileName){
                newPaths.push({
                    fileName: element.fileName,
                    path: element.path,
                    type: element.type
                })
            }
            return newPaths;
        })

        this.setState({selectedFiles: files, upload_path_type:newPaths});

    }

    submitFile = () => {
        const {paramID, upload_path_type, newLiminar} = this.state;
        const id = parseInt(paramID);

        const newAudit = {
            "description": this.state.description,
            "company_id": id,
            "money_recovered_total": 0,
            "status_process": "PROCESSING",
            "list_files": [
            ]
        }
        upload_path_type.map(element=>{
            newAudit.list_files.push({
                "path": element.path,
                "type": element.type
            })
            return newAudit
        })
        let auditoria_id = 0;
        createAuditApi(newAudit).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            
            auditoria_id = response.data.result[0].id;
            console.log("auditoria_id", auditoria_id);
            let flag = true;
            newLiminar.forEach(element => {
                const data = {
                    "auditoria_id": auditoria_id,
                    "description": element.description,
                    "date_start": element.start_date.getFullYear() + "-" + (element.start_date.getMonth() + 1) + "-" + element.start_date.getDate(),
                    "date_end": element.end_date.getFullYear() + "-" + (element.end_date.getMonth() + 1) + "-" + element.end_date.getDate(),
                }
                createLiminares(data).then(response => {
                    if (response.status === 400 || response.status === 500)
                        throw response.data;
                }).catch(error => {
                    console.log('error', error);
                    flag = false;
                })
            });
            if ( flag){
                this.setState({modal_success: true});
            }
            
        }).catch(error => {
            console.log('error', error);
        });

        
    }
    /**
     * Formats the size
     */
    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    validate = (description, files) => {
        return {
            description: description.length === 0,
            files: files.length === 0,
        };
    }

    render() {
        const errors = this.validate(this.state.description, this.state.formFiles);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        var types = [];
        if ( this.props.upload_other_compatible_types){
            var index = 0;
            this.props.upload_other_compatible_types.forEach( (element) =>{
                types.push({
                    value: element,
                    index: index
                })
                index++
            })
        }
        const backUrl = "/audit-filter/" + this.state.paramID
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title={this.state.breadcrumbItem.title} desc={this.state.breadcrumbItem.desk}
                                     buttonTitle={this.state.breadcrumbItem.buttonTitle} buttonLink="/"/>

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
                                        Coloque a descrição da Auditoria e os arquivos que deseja fazer os cruzamentos
                                    </CardTitle>
                                        <br/>
                                        <Row>
                                            <Col lg="12">
                                                <Label>Descrição da Auditoria (*)</Label>
                                                <FormGroup className="select2-container">
                                                    <Input
                                                        autoFocus
                                                        className={errors.description ? "form-control error" : "form-control"}
                                                        value={this.state.description}
                                                        onChange={this.handleDescription.bind(this)}
                                                        placeholder="descrição"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>

                                            <CardBody>
                                                <Form>
                                                    <Dropzone
                                                        onDrop={acceptedFiles =>
                                                            this.handleAcceptedFiles(acceptedFiles)
                                                        }
                                                        multiple = {false}
                                                    >
                                                        {({getRootProps, getInputProps}) => (
                                                            <div className="dropzone">
                                                                <div
                                                                    className="dz-message needsclick mt-2"
                                                                    {...getRootProps()}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    <div className="mb-3">
                                                                        <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                    </div>
                                                                    <h4>Faça o upload dos arquivos fiscais aqui.</h4>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                    <div
                                                        className="dropzone-previews mt-3"
                                                        id="file-previews"
                                                    >

                                                        {
                                                            this.state.showBtn && (
                                                                <Card>
                                                                    <Row>
                                                                        <Col className="col-5">
                                                                            <Label style={{
                                                                                fontFamily: "Arial",
                                                                                fontWeight: 700,
                                                                                fontSize: "18px",
                                                                                lineHeight: "22.59px"
                                                                            }}>
                                                                                Arquivos selecionados</Label><br/>
                                                                            <Button
                                                                                color="info"
                                                                                size="lg"
                                                                                className="waves-effect waves-light"
                                                                            >
                                                                                {this.props.upload_type}
                                                                            </Button>
                                                                        </Col>
                                                                        <Col className="col-1"></Col>
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
                                                                                {this.props.upload_periodoReferenciaInicial}
                                                                            </label>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col className="col-5">
                                                                            <Label style={{
                                                                                fontFamily: "Arial",
                                                                                fontWeight: 700,
                                                                                fontSize: "18px",
                                                                                lineHeight: "22.59px"
                                                                            }}>Arquivos selecionados</Label><br/>
                                                                            <div className="button-items">
                                                                                {
                                                                                    types &&
                                                                                    types.map((item, key) =>
                                                                                        <Button
                                                                                            color="light"
                                                                                            size="lg"
                                                                                            className="waves-effect waves-light"
                                                                                            disabled={true}
                                                                                            key = {item.index}
                                                                                        >
                                                                                            {item.value}
                                                                                        </Button>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </Col>
                                                                        <Col className="col-1"></Col>
                                                                        <Col className="col-4">
                                                                            <Label style={{
                                                                                fontFamily: "Arial",
                                                                                fontWeight: 700,
                                                                                fontSize: "18px",
                                                                                lineHeight: "22.59px"
                                                                            }}>Arquivos</Label><br/>
                                                                            {
                                                                                this.state.selectedFiles.map((f, i) => {
                                                                                    return (
                                                                                        <div key={i}>
                                                                                            <label
                                                                                                className="text-muted"
                                                                                                style={{
                                                                                                    fontFamily: "Arial",
                                                                                                    fontWeight: 400,
                                                                                                    fontSize: "14px",
                                                                                                    lineHeight: "24px"
                                                                                                }}>
                                                                                                {f.name}
                                                                                            </label>
                                                                                            <Button
                                                                                                color="light"
                                                                                                size="sm"
                                                                                                className="ml-2"
                                                                                                onClick={() => {
                                                                                                    this.handleDelectFile(f.name)
                                                                                                }}
                                                                                            >
                                                                                                <i className="ri-delete-bin-fill"></i>
                                                                                            </Button>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                        </Col>
                                                                    </Row>
                                                                </Card>
                                                            )
                                                        }
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='d-flex justify-content-between'>
                            <Col lg="6">
                                <FormGroup className="select2-container ml-2">
                                    <Button
                                        color="info"
                                        outline
                                        size="md"
                                        className="btn-rounded"

                                        style={{
                                            border: '2px solid', paddingLeft: "2em", paddingRight: "2em",
                                            fontFamily: "Arial", fontWeight: 400, fontSize: "18px", lineHeight: "22.59px"
                                        }}
                                    >
                                        <Link to={backUrl}>Voltar</Link>

                                    </Button>
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup className="select2-container ml-2">
                                    <Button
                                        color="primary"
                                        size="md"
                                        className="waves-effect waves-light mr-1"
                                        onClick={this.show_dialog}
                                        disabled={!this.state.showBtn && !isEnabled}
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
                                        Liminares
                                    </Button>
                                </FormGroup>
                            </Col>
                            <Col lg="3">
                                <FormGroup className="select2-container ml-2">
                                    <Button
                                        color="primary"
                                        size="md"
                                        className="waves-effect waves-light mr-1"
                                        onClick={this.submitFile}
                                        disabled={!this.state.showBtn && !isEnabled}
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
                                        Iniciar auditoria
                                    </Button>
                                </FormGroup>
                            </Col>    
                        </Row>

                    </Container>
                </div>

                <Row>
                    <Col sm={6} md={4} xl={3} className="mt-4">
                        <Modal
                            size="xl"
                            isOpen={this.state.modal_standard}
                            toggle={this.tog_standard}
                        >
                            <ModalBody>
                                <Row style={{alignItems: 'center', marginTop: "2em", mraginBottom: "2em"}}>
                                    <Col lg="4">
                                        <FormGroup className="mr-2">
                                            <Label style={{
                                                fontFamily: "Arial",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                lineHeight: "18px"
                                            }}>Descrição</Label>
                                            <Input className="form-control" type="search"
                                                    placeholder="Descrição"
                                                    value = {this.state.newLiminarDescription}
                                                    onChange = {this.handlenewLiminarDescription.bind(this)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup className="mb-4">
                                            <Label>Data inicial</Label>
                                            <InputGroup>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={this.state.start_date}
                                                    onChange={this.handleStartDate}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup className="mb-4">
                                            <Label>Date final</Label>
                                            <InputGroup>
                                                <DatePicker
                                                    className="form-control"
                                                    selected={this.state.end_date}
                                                    onChange={this.handleEndDate}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </InputGroup>
                                        </FormGroup>
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
                                                                <th className="col-3">Descrição</th>
                                                                <th className="col-3">Data inicial</th>
                                                                <th className="col-3">Data final</th>
                                                                <th className="col-3">Ações</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                this.state.newLiminar.map((item, key) =>
                                                                    <tr style={{
                                                                        fontFamily: "Arial",
                                                                        fontWeight: 400,
                                                                        fontSize: "14px",
                                                                        lineHeight: "16px"
                                                                    }} key={item.id}>
                                                                        <th>{item.description}</th>
                                                                        <td style={{color: "#8ACB50"}}>"{item.start_date_string}"</td>
                                                                        <td className="text-muted">"{item.end_date_string}"</td>
                                                                        <td>
                                                                            <div className="button-items">
                                                                                <Button
                                                                                    color="light"
                                                                                    size="sm"
                                                                                    onClick={() => this.removeAudit(item.id)}
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
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    onClick={this.tog_standard}
                                    color="primary" className="waves-effect waves-light"
                                >
                                    Fechar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={this.handleAddAudit}
                                    color="primary" className="waves-effect waves-light"
                                >
                                    Adicionar
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal_success}>
                    <ModalHeader>Sua auditoria foi realizada com sucesso!</ModalHeader>
                    <ModalBody>
                        <p>Dentro de alguns instantes a sua auditoria estará disponível para analise</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={() => this.redirectToAuditFilter()}
                        >
                            Voltar para página de auditorias.
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStatetoProps = state => {
    const {upload_type, upload_other_compatible_types, upload_periodoReferenciaInicial, upload_path, upload_file_status} = state.Auditory;
    const {companies} = state.Company;
    return {upload_type, upload_other_compatible_types, upload_periodoReferenciaInicial, upload_path, companies, upload_file_status}
}
export default withRouter(connect(mapStatetoProps, {uploadFile, createAuditory, getCompany})(NewAuditScreen));
