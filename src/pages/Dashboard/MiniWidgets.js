import React, { Component } from 'react';
import { Col, Card, CardBody} from "reactstrap";
import { CardTitle, CardImg, CardText,CardImgOverlay } from "reactstrap";
import img7 from "../../assets/images/dashboard/cardBG.png";
class MiniWidgets extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.reports.map((report, key) =>
                                    <Col key={key} md={4}>
                                        <Card>
                                            <CardImg className="img-fluid" src={img7} alt="Skote" style={{ opacity: 0.9}} />
                                            <CardImgOverlay>
                                                <CardBody className="mb-1">
                                                    <CardTitle>
                                                        <h4 className="text-white mb-4"
                                                            style={{fontFamily:"Arial", fontWeight: 700, fontSize: "24px", lineHeight:"28.06px"}}>
                                                               {report.symbol} {report.value}
                                                        <i className="ri-pie-chart-fill ml-2 mt-4"></i>
                                                    </h4>
                                                    </CardTitle>
                                                    <CardText style={{color:"#96A8BB"}}>{report.bottom}</CardText>
                                                </CardBody>
                                            </CardImgOverlay>
                                            <CardBody className="border-top py-3">
                                                <div className="text-truncate">
                                                    <CardText className="text-center"
                                                        style={{fontFamily:"Arial", fontWeight: 400, fontSize: "16px", lineHeight:"18.7px", color:"#02223D"}}>
                                                         {report.desc}
                                                    </CardText>
                                                </div>
                                            </CardBody>
                                        </Card>

                                    </Col>
                    )
                }
            </React.Fragment>
        );
    }
}

export default MiniWidgets;
