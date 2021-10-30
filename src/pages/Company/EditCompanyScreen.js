import React, {Component} from "react";

import {
    Row, Col, Card, CardBody, Container, FormGroup, Label, Input,
    Dropdown, DropdownToggle, BreadcrumbItem, Breadcrumb, Button,
    InputGroup, Table
} from "reactstrap";
// Redux
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import DatePicker from "react-datepicker";

import Select from "react-select";

import {Autocomplete} from "@material-ui/lab";
import {TextField} from '@material-ui/core'
import {updateCompany, getCompany, getState, getCity, getCnae, getTax} from "../../store/actions";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

const optionGroup = [
    {label: "REAL", value: "Real"},
    {label: "PRESUMIDO", value: "PRESUMIDO"}
];

class EditCompanyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "Editar Registro - Cliente",
                desc: "Preencha o formulário para criar um novo registro",
                buttonTitle: ""
            },
            cnpj: "",
            company: "",
            nome: "",
            address: "",
            complement: "",
            email: "",
            cep: "",
            neighborhood: "",

            condition: "",
            county: "",
            primary: "",
            secondary: "",
            tax: "",
            profit: "",
            modal_standard: false,

            start_date: new Date(),
            end_date: new Date(),

            menu1: false,
            menu2: false,

            secondaryItems: [],
            taxRegimes: [],
            key: 1,
            paramID: props.match.params.companyID,
            companyID: 0,
        };
    }

    componentDidMount() {
        this.props.getCompany();
        this.props.getState();
        this.props.getCnae();
        this.props.getTax();
    }

    backOtherScreen = () => {
        this.props.history.push('/filter');
    }

    componentDidUpdate(prevProps) {
        const companies = this.props.companies;
        if (prevProps.companies !== this.props.companies) {
            const {paramID} = this.state;
            const id = parseInt(paramID);
            let index = 0;
            let iterator = 0;
            const companies = this.props.companies;
            companies.forEach(element => {
                if (element.id === id) {
                    index = iterator;
                }
                iterator++;
            })
            this.setState({companyID: index});

            const cnpj = companies[index].cnpj;
            const email = companies[index].email;
            const company = companies[index].razao_social;
            const nome = companies[index].nome_fantasia;
            const address = companies[index].endereco;
            const complement = companies[index].complemento;
            const neighborhood = companies[index].bairro;
            const cep = companies[index].cep;
            this.setState({
                cnpj, email, company, nome, address, complement, neighborhood, cep
            })
        }
        if (prevProps.states !== this.props.states) {
            const {companyID} = this.state;
            const state_id = companies[companyID].state_id;
            const states = this.props.states;
            var state = parseInt(state_id);
            var condition;

            states.forEach(element => {
                if (element.id === state) {
                    this.props.getCity(state);
                    condition = {
                        label: element.description,
                        value: element.id
                    };
                }
            })
            this.setState({condition});
        }
        if (prevProps.cities !== this.props.cities) {
            const {companyID} = this.state;
            const city_id = companies[companyID].city_id;
            const cities = this.props.cities;
            var city = parseInt(city_id);
            var county;
            cities.forEach(element => {
                if (element.id === city) {
                    county = {
                        label: element.description,
                        value: element.id
                    }
                }
            })
            this.setState({county});
        }
        if (prevProps.tax !== this.props.tax) {
            const {companyID} = this.state;
            const tax_id = companies[companyID].cnae_id;
            const tax = this.props.tax;
            var taxID = parseInt(tax_id);
            tax.forEach(element => {
                if (element.id === taxID) {
                    this.setState({primary: element.description});
                }
            })

        }
    }

    removeItmeFromSecondary = value => {
        const newItems = []
        const {secondaryItems} = this.state;
        secondaryItems.forEach(element => {
            if (element.value !== value) {
                newItems.push(element)
            }
        })
        this.setState({secondaryItems: newItems});
    }

    removeItemFromRegimes = key => {
        const newItems = [];
        const {taxRegimes} = this.state;
        taxRegimes.forEach(element => {
            if (element.id !== key) {
                newItems.push(element);
            }
        })
        this.setState({taxRegimes: newItems});
    }
    //DatePicker
    handleStartDate = date => {
        this.setState({start_date: date});
    }
    handleEndDate = date => {
        this.setState({end_date: date});
    }

    cleanSearch = () => {
        this.setState({
            company: "",
            cnpj: "",
            nome: "",
            address: "",
            complement: "",
            email: "",
            cep: "",
            neighborhood: "",

            condition: "",
            county: "",
            primary: "Test",
            primaryValue: 0,
            secondary: "",
            tax: "",
            start_date: new Date(),
            end_date: new Date(),

            key: 1,

            secondaryItems: []
        });
    }
    handleCnpj = e => {
        this.setState({cnpj: e.target.value});
    }

    handleCompany = e => {
        this.setState({company: e.target.value});
    };

    handleNome = e => {
        this.setState({nome: e.target.value});
    }
    handleAddress = e => {
        this.setState({address: e.target.value});
    }

    handleComplement = e => {
        this.setState({complement: e.target.value});
    }

    handleNeighborhood = e => {
        this.setState({neighborhood: e.target.value});
    }

    handleCEP = e => {
        this.setState({cep: e.target.value});
    }

    handleEmail = e => {
        this.setState({email: e.target.value});
    }

    handleCounty = county => {
        this.setState({county})
    }

    handlePrimary = (value) => {
        this.setState({primary: value.description});
        this.setState({primaryValue: value.value})
    }

    handleSecondary = secondary => {
        this.setState({secondary})
    }

    addSecondaryItem = () => {
        const {secondary} = this.state;
        if (secondary !== "") {
            const {secondaryItems} = this.state;
            var flag = false;
            secondaryItems.forEach(element => {
                if (element.value === secondary.value)
                    flag = true;
            })
            if (!flag) {
                secondaryItems.push(secondary);
                this.setState({secondaryItems});
            }
        }
    }

    addTaxRegime = () => {
        const {start_date, end_date, tax, profit, key} = this.state;
        if (tax !== "" && profit !== "" && start_date <= end_date) {
            const {taxRegimes} = this.state;
            var flag = false;
            taxRegimes.forEach(element => {
                const s_date = start_date;
                const e_date = end_date;
                if (element.start_date === s_date && element.end_date === e_date) {
                    flag = true;
                }
            })
            if (!flag) {
                var start_month = (start_date.getMonth() + 1) + "";
                if ( start_month.length === 1)
                    start_month = "0" + start_month;
                var end_month = (end_date.getMonth() + 1) + "";
                if ( end_month.length === 1)
                    end_month = "0" + end_month;
                taxRegimes.push({
                    id: key,
                    tax: tax.value,
                    profit: profit.value,
                    start_date: start_date.toDateString(),
                    end_date: end_date.toDateString(),
                    start_date_string: start_date.getDate()  + "/" + (start_month) + "/" +start_date.getFullYear() ,
                    end_date_string: end_date.getDate() + "/" + (end_month) + "/" +end_date.getFullYear(),
                    start_date_backend:start_date.getFullYear() + "-" + (start_month) + "-" + start_date.getDate(),
                    end_date_backend:end_date.getFullYear() + "-" + (end_month) + "-" + end_date.getDate()
                })
                this.setState({taxRegimes})
                this.setState({key: key + 1});
            }

        }
    }

    handleTax = tax => {
        this.setState({tax})
    }

    handleProfit = profit => {
        this.setState({profit})
    }

    handleCondition = condition => {
        this.setState({condition});
        this.props.getCity(condition.value);
    }
    onClickCreate = () => {
        console.log("click here");
        const company = {
            "cnpj": this.state.cnpj,
            "razao_social": this.state.company,
            "nome": this.state.nome,
            "endereco": this.state.address,
            "complemento": this.state.complement,
            "bairro": this.state.neighborhood,
            "cep": this.state.cep,
            "state": this.state.condition.value,
            "city": this.state.county.value,
            "cnae": this.state.primaryValue,
            "email": this.state.email,

            "cnaes": [],
            "regime_tributarios": []
        }
        this.state.secondaryItems.forEach(element => {
            company.cnaes.push(element.value);
        })

        this.state.taxRegimes.forEach(element => {
            company.regime_tributarios.push({
                "date_begin": element.start_date_backend,
                "date_end": element.end_date_backend,
                "regime_tributario_id": element.tax,
                "lucro": element.profit
            });
        })
        const {companyID} = this.state;
        this.props.updateCompany(companyID, company, this.props.history);
    }


    validate = (cnpj, company, nome, address, complement, email, cep, neighborhood, primary, secondaryItems, taxRegimes) => {
        return {
            cnpj: cnpj.length === 0,
            company: company.length === 0,
            nome: nome.length === 0,
            address: address.length === 0,
            email: email.length === 0,
            cep: cep.length === 0,
            neighborhood: neighborhood.length === 0,
            primary: primary.length === 0,
            secondaryItems: secondaryItems.length === 0,
            taxRegimes: taxRegimes.length === 0,
        };
    }

    render() {
        const states = this.props.states;
        const cnaes = this.props.cnaes;
        const cities = this.props.cities;
        const tax = this.props.tax;

        const stateOptionGroup = [];
        states.forEach(element => {
            stateOptionGroup.push({
                label: element.description,
                value: element.id
            })
        });

        const primaryOption = [];
        cnaes.forEach(element => {
            primaryOption.push({
                value: element.id,
                label: element.description
            })
        })

        const secondary = [];
        cnaes.forEach(element => {
            secondary.push({
                label: element.description,
                value: element.id
            })
        })

        const taxOptionGroup = [];
        tax.forEach(element => {
            taxOptionGroup.push({
                label: element.description,
                value: element.id
            })
        })
        const cityOptionGroup = [];
        cities.forEach(element => {
            cityOptionGroup.push({
                label: element.description,
                value: element.id
            })
        })

        const {secondaryItems, taxRegimes, primary, primaryValue} = this.state;

        const errors = this.validate(this.state.cnpj, this.state.company, this.state.nome, this.state.address, this.state.complement, this.state.email,
            this.state.cep, this.state.neighborhood, this.state.primary,
            this.state.secondaryItems, this.state.taxRegimes);

        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xs={12}>
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <Breadcrumb listClassName="m-0">
                                        <BreadcrumbItem active>Cadastros</BreadcrumbItem>
                                        <BreadcrumbItem active>Clientes/Empresas</BreadcrumbItem>
                                        <BreadcrumbItem>Novo Registro</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </Col>
                        </Row>

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
                                        <h3 className="card-title mb-4">Novo Registro - Cliente</h3>

                                        <p className="card-title-desc">Preencha o formulário para criar um novo registro
                                        </p>
                                        <Row style={{alignItems: 'center', marginTop: "2em"}}>
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label>CNPJ (*)</Label>
                                                    <CpfCnpj
                                                        className={errors.cnpj ? "form-control error" : "form-control"}
                                                        type="search"
                                                        value={this.state.cnpj}
                                                        autoFocus
                                                        onChange={this.handleCnpj.bind(this)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="8">
                                                <Label>Razao Social (*)</Label>
                                                <FormGroup className="select2-container">
                                                    <Input className={errors.company ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.company}
                                                           onChange={this.handleCompany.bind(this)}
                                                           placeholder="Razao Social"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row style={{alignItems: 'center', marginTop: "1em"}}>
                                            <Col lg="8">
                                                <FormGroup className="mr-2">
                                                    <Label>Nome Fantasia (*)</Label>
                                                    <Input className={errors.nome ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.nome}
                                                           onChange={this.handleNome.bind(this)}
                                                           placeholder="Nome Fantasia"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center', marginTop: "1em"}}>
                                            <Col lg="5">
                                                <FormGroup className="mr-2">
                                                    <Label>Endereço (*)</Label>
                                                    <Input className={errors.address ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.address}
                                                           onChange={this.handleAddress.bind(this)}
                                                           placeholder="Endereço"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="7">
                                                <Label>Complemento</Label>
                                                <FormGroup className="select2-container">
                                                    <Input className={errors.complement ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.complement}
                                                           onChange={this.handleComplement.bind(this)}
                                                           placeholder="Complemento"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row style={{alignItems: 'center', marginTop: "1em"}}>
                                            <Col lg="4">
                                                <FormGroup className="mr-2">
                                                    <Label>Bairro (*)</Label>
                                                    <Input className={errors.neighborhood ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.neighborhood}
                                                           onChange={this.handleNeighborhood.bind(this)}
                                                           placeholder="Bairro"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <Label>CEP (*)</Label>
                                                <FormGroup className="select2-container">
                                                    <Input className={errors.cep ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.cep}
                                                           onChange={this.handleCEP.bind(this)}
                                                           placeholder="CEP"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <Label>E-mail (*)</Label>
                                                <FormGroup className="select2-container">
                                                    <Input className={errors.email ? "form-control error" : "form-control"} type="search"
                                                           value={this.state.email}
                                                           onChange={this.handleEmail.bind(this)}
                                                           placeholder="Digite seu E-mail"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="4">
                                                <FormGroup className="select2-container">
                                                    <Label>Estado (*)</Label>
                                                    <Select
                                                        value={this.state.condition}
                                                        onChange={this.handleCondition}
                                                        options={stateOptionGroup}
                                                        classNamePrefix="select2-selection"
                                                        placeholder="Estado"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup className="select2-container">
                                                    <Label>Município (*)</Label>
                                                    <Select
                                                        value={this.state.county}
                                                        onChange={this.handleCounty}
                                                        options={cityOptionGroup}
                                                        classNamePrefix="select2-selection"
                                                        placeholder="Município"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup className="select2-container">
                                                    <Label>CNAE Primário (*)</Label>
                                                    <Autocomplete
                                                        id="combo-box-demo"
                                                        value={primaryValue}
                                                        options={primaryOption}
                                                        getOptionLabel={(option) => option.label}
                                                        renderInput={(params) => <TextField {...params} label={primary}
                                                                                            variant="outlined"/>}
                                                        onChange={(event, value) => this.handlePrimary(value)}
                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="4">
                                                <FormGroup className="select2-container">
                                                    <Label>CNAE Secundário (*)</Label>
                                                    <Row>
                                                        <Col lg="11" style={{paddingRight: 0}}>
                                                            <Select
                                                                value={this.state.secondary}
                                                                onChange={this.handleSecondary}
                                                                options={secondary}
                                                                classNamePrefix="select2-selection"
                                                                placeholder="CNAE Secundário"
                                                            />
                                                        </Col>
                                                        <Col lg="1" style={{paddingLeft: 0}}>
                                                            <Button type="button" color="primary" onClick={() => {
                                                                this.addSecondaryItem()
                                                            }}>
                                                                <i className="mdi mdi-plus"></i>
                                                            </Button></Col></Row>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2">
                                                <FormGroup className="select2-container">
                                                    <Label
                                                        style={{
                                                            fontFamily: "Arial", fontWeight: 400, fontSize: "14px",
                                                            lineHeight: "18px"
                                                        }}>Regime Tributário (*)</Label>
                                                    <Select
                                                        value={this.state.tax}
                                                        onChange={this.handleTax}
                                                        options={taxOptionGroup}
                                                        classNamePrefix="select2-selection"
                                                        placeholder="Regime Tributário"

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="1">
                                                <FormGroup className="mb-4">
                                                    <Label>Data Inicial</Label>
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
                                            <Col lg="1">
                                                <FormGroup className="mb-4">
                                                    <Label>Date Final</Label>
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
                                            <Col lg="2">
                                                <FormGroup className="select2-container">
                                                    <Label
                                                        style={{
                                                            fontFamily: "Arial", fontWeight: 400, fontSize: "14px",
                                                            lineHeight: "18px"
                                                        }}>Lucuro</Label>
                                                    <Row>
                                                        <Col lg="10" style={{paddingRight: 0}}>
                                                            <Select
                                                                value={this.state.profit}
                                                                onChange={this.handleProfit}
                                                                options={optionGroup}
                                                                classNamePrefix="select2-selection"
                                                                placeholder="Regime Tributário"
                                                            />
                                                        </Col>
                                                        <Col lg="2" style={{paddingLeft: 0}}>
                                                            <Button type="button" color="primary" onClick={() => {
                                                                this.addTaxRegime()
                                                            }}>
                                                                <i className="mdi mdi-plus"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                            </Col>

                                            <Col lg="2">
                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value=""
                                                           id="defaultCheck2" defaultChecked/>
                                                    <Label className="form-check-label" htmlFor="defaultCheck2"
                                                           style={{
                                                               fontFamily: "Arial",
                                                               fontWeight: 400,
                                                               fontSize: "14px",
                                                               lineHeight: "18px",
                                                               width: "80%"
                                                           }}>
                                                        Substituto Tributário
                                                    </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col lg="4">
                                                    {
                                                        secondaryItems.length > 0 &&
                                                        <div className="table-rep-plugin">
                                                            <div className="table-responsive mb-0"
                                                                 data-pattern="priority-columns">
                                                                <Table id="tech-companies-1" responsive striped>
                                                                    <thead>
                                                                    <tr style={{
                                                                        fontFamily: "Karla",
                                                                        fontWeight: 700,
                                                                        fontSize: "16px",
                                                                        lineHeight: "18.7px"
                                                                    }}>
                                                                        <th className="col-1">Código</th>
                                                                        <th className="col-10">Cnae</th>
                                                                        <th className="col-1">Remove</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        secondaryItems.map((item, key) =>
                                                                            <tr style={{
                                                                                fontFamily: "Karla",
                                                                                fontWeight: 400,
                                                                                fontSize: "14px",
                                                                                lineHeight: "16px"
                                                                            }} key={item.value}>
                                                                                <th>{item.value}</th>
                                                                                <td style={{color: "#8ACB50"}}>{item.label}</td>
                                                                                <td>
                                                                                    <Button
                                                                                        color="light"
                                                                                        size="sm"
                                                                                        onClick={() => {
                                                                                            this.removeItmeFromSecondary(item.value)
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-delete-bin-fill"></i>
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    }

                                                </Col>
                                                <Col lg="6">
                                                    {
                                                        taxRegimes.length > 0 &&

                                                        <div className="table-rep-plugin">
                                                            <div className="table-responsive mb-0"
                                                                 data-pattern="priority-columns">
                                                                <Table id="tech-companies-1" responsive striped>
                                                                    <thead>
                                                                    <tr style={{
                                                                        fontFamily: "Karla",
                                                                        fontWeight: 700,
                                                                        fontSize: "16px",
                                                                        lineHeight: "18.7px"
                                                                    }}>
                                                                        <th className="col-3">Regime tributário</th>
                                                                        <th className="col-2">Data inicial</th>
                                                                        <th className="col-2">Data final</th>
                                                                        <th className="col-3">Lucro</th>
                                                                        <th className="col-2">Remove</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        taxRegimes.map((item, key) =>
                                                                            <tr style={{
                                                                                fontFamily: "Karla",
                                                                                fontWeight: 400,
                                                                                fontSize: "14px",
                                                                                lineHeight: "16px"
                                                                            }} key={item.id}>
                                                                                <td>{item.tax}</td>
                                                                                <td>{item.start_date_string}</td>
                                                                                <td>{item.end_date_string}</td>
                                                                                <td style={{color: "#8ACB50"}}>{item.profit}</td>
                                                                                <td>
                                                                                    <Button
                                                                                        color="light"
                                                                                        size="sm"
                                                                                        onClick={() => {
                                                                                            this.removeItemFromRegimes(item.id)
                                                                                        }}
                                                                                    >
                                                                                        <i className="ri-delete-bin-fill"></i>
                                                                                    </Button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    }
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>

                                    <CardBody className="border-top">
                                        <Row>
                                            <Col lg="8">
                                                <FormGroup className="select2-container ml-2">
                                                    <Button
                                                        color="info"
                                                        outline
                                                        size="md"
                                                        className="btn-rounded"
                                                        onClick={this.backOtherScreen}
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
                                                        Voltar
                                                    </Button>
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
                                                            fontWeight: 700,
                                                            fontSize: "18px",
                                                            lineHeight: "22px"
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
                                                        style={{
                                                            border: '2px solid',
                                                            paddingLeft: "2em",
                                                            paddingRight: "2em",
                                                            fontFamily: "Arial",
                                                            fontWeight: 700,
                                                            fontSize: "18px",
                                                            lineHeight: "22.59px",
                                                            width: "80%"
                                                        }}
                                                        disabled={!isEnabled}
                                                        onClick={this.onClickCreate}>
                                                        Salvar
                                                    </Button>
                                                </FormGroup>
                                            </Col>
                                        </Row>
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
    const {states} = state.State;
    const {cities} = state.City;
    const {cnaes} = state.Cnae;
    const {tax} = state.Tax;
    const {companies} = state.Company;
    return {states, cities, cnaes, tax, companies}
}
export default withRouter(connect(mapStatetoProps, {
    updateCompany,
    getCompany,
    getState,
    getCity,
    getCnae,
    getTax
})(EditCompanyScreen));
