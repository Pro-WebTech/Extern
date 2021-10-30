import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";

import BarChart from "../../components/Charts/barchart";

// Redux
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {aboutMe} from "../../store/actions";

import {getDashBoardData} from "../../axios/dashboard";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItem: {
                title: "",
                desk: "Seja bem vindo ao Audit!"
            },
            reports: [],
            data: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: [
                            '#2A7AD8', '#B8C8DD', '#93C1F9', '#4A90E2', '#6D99CD', '#2A7AD8', '#4A90E2', '#93C1F9',
                            '#6D99CD', '#095FC4', '#4A90E2', '#93C1F9',
                        ],
                        borderColor: "rgba(52, 195, 143, 0.8)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
                        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
                        data: []
                    }
                ]
            },
        }
    }

    componentDidMount() {
        console.log("0");
        this.props.aboutMe();
        const user_id = localStorage.getItem("userID")
        this.showDashBoardInformations(user_id);
    }

    showDashBoardInformations = (user_id) => {

        if (user_id === null) {
            user_id = 0;
        }
        getDashBoardData(user_id).then(response => {
            const data = response.data.result;
            this.setState({
                reports: [
                    {
                        icon: "ri-stack-line",
                        symbol: "",
                        value: data[0].number_files_total,
                        bottom: "NoS ÚLTIMOS 30 dias",
                        desc: "Arquivos Auditados"
                    },
                    {
                        icon: "ri-store-2-line",
                        symbol: "R$ ",
                        value: data[0].money_recovered_total,
                        bottom: "Nos Últimos 30 dias",
                        desc: "Em Créditos Recuperados"
                    },
                    {
                        icon: "ri-briefcase-4-line",
                        symbol: "",
                        value: data[0].number_audit_total,
                        bottom: "NoS ÚLTIMOS 30 dias",
                        desc: "Auditorias Realizadas"
                    },
                ],
            });

            let months = [];
            let values_per_month = [];
            data[0].audits_per_month.forEach(element => {
                months.push(element.month_year);
                values_per_month.push(element.total);
            });
            this.setState({
                data: {
                    labels: months,
                    datasets: [
                        {
                            backgroundColor: [
                                '#2A7AD8', '#B8C8DD', '#93C1F9', '#4A90E2', '#6D99CD', '#2A7AD8', '#4A90E2', '#93C1F9',
                                '#6D99CD', '#095FC4', '#4A90E2', '#93C1F9',
                            ],
                            borderColor: "rgba(52, 195, 143, 0.8)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
                            hoverBorderColor: "rgba(52, 195, 143, 0.9)",
                            data: values_per_month
                        }
                    ]
                }
            });

        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        const username = this.props.username;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title={username} desc={this.state.breadcrumbItem.desk} buttonTitle=""/>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={this.state.reports}/>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Card>
                                    <CardBody>

                                        <Dropdown className="float-right" isOpen={this.state.menu}
                                                  toggle={() => this.setState({menu: !this.state.menu})}>
                                            <DropdownToggle tag="i" className="arrow-none card-drop">
                                                <i className="mdi mdi-dots-vertical"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>

                                                <DropdownItem href="">Action 1</DropdownItem>

                                                <DropdownItem href="">Action 2</DropdownItem>

                                                <DropdownItem href="">Action 3</DropdownItem>

                                                <DropdownItem href="">Action 4</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                        <CardTitle className="mb-6"
                                                   style={{
                                                       fontFamily: "Arial",
                                                       fontWeight: 700,
                                                       fontSize: "24px",
                                                       lineHeight: "24px"
                                                   }}>
                                            Auditorias por Mês
                                        </CardTitle>
                                        <CardText className="mb-6 text-muted">Compare o gráfico de suas auditorias com
                                            os meses anteriores</CardText>

                                        <BarChart data={this.state.data}/>

                                        <Row className="text-center mt-4">
                                            <Col xs={1}></Col>
                                            <Col xs={2}>
                                                    <span className="text-mark text-muted text-truncate">
                                                        <span style={{
                                                            display: 'inline-block',
                                                            width: '15px',
                                                            height: '15px',
                                                            marginTop: '2.5px',
                                                            marginRight: '10px',
                                                            backgroundColor: '#b8c8dd',
                                                            right: '0px'
                                                        }}></span>
                                                        0-10,000
                                                    </span>
                                            </Col>
                                            <Col xs={2}>
                                                <span className="text-mark text-muted text-truncate">
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '15px',
                                                        height: '15px',
                                                        marginTop: '2.5px',
                                                        marginRight: '10px',
                                                        backgroundColor: '#93c1f9',
                                                        right: '0px'
                                                    }}></span>
                                                        10,000-20,000
                                                    </span>
                                            </Col>
                                            <Col xs={2}>
                                                    <span className="text-mark text-muted text-truncate">
                                                        <span style={{
                                                            display: 'inline-block',
                                                            width: '15px',
                                                            height: '15px',
                                                            marginTop: '2.5px',
                                                            marginRight: '10px',
                                                            backgroundColor: '#6d99cd',
                                                            right: '0px'
                                                        }}></span>
                                                        20,000-30,000
                                                    </span>
                                            </Col>
                                            <Col xs={2}>
                                                    <span className="text-mark text-muted text-truncate">
                                                        <span style={{
                                                            display: 'inline-block',
                                                            width: '15px',
                                                            height: '15px',
                                                            marginTop: '2.5px',
                                                            marginRight: '10px',
                                                            backgroundColor: '#2a7ad8',
                                                            right: '0px'
                                                        }}></span>
                                                        40,000-50,000
                                                    </span>
                                            </Col>
                                            <Col xs={2}>
                                                    <span className="text-mark text-muted text-truncate">
                                                        <span style={{
                                                            display: 'inline-block',
                                                            width: '15px',
                                                            height: '15px',
                                                            marginTop: '2.5px',
                                                            marginRight: '10px',
                                                            backgroundColor: '#095fc3',
                                                            right: '0px'
                                                        }}></span>
                                                        60,000-70,000
                                                    </span>
                                            </Col>
                                            <Col xs={1}></Col>
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
    const {useremail, username} = state.User;
    return {useremail, username};
}

export default withRouter(connect(mapStatetoProps, {aboutMe})(Dashboard));
