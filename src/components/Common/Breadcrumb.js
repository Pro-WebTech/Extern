import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";

class Breadcrumbs extends Component {
    render() {


        return (
            <React.Fragment>
                <Row style={{ marginBottom: "1em" }}>
                    <Col xs={3}>
                        {/* <div className="d-flex align-items-center justify-content-between mb-5"> */}
                        <h4 className="mb-3" style={{ fontFamily: "Arial", fontWeight: 700, fontSize: "24px", lineHeight: "24px" }}>
                            {this.props.t(this.props.title)}
                        </h4>
                        <label className="text-muted" style={{ fontFamily: "Arial", fontWeight: 400, fontSize: "14px", lineHeight: "24px" }}>
                            {this.props.t(this.props.desc)}
                        </label>
                    </Col>
                    <Col xs={9}>
                        <div className="page-title-right flex">
                                {
                                    this.props.buttonTitle === "" ?
                                        null
                                        : <Button
                                            color="info"
                                            className="btn-rounded waves-effect waves-light mr-1"
                                            size="lg"
                                            style={{ padding: "2em", paddingRight:"2em", paddingTop:"1em", paddingBottom:"1em",  position: "absolute", right: "0.5em"}}
                                        >
                                            <Link to={this.props.buttonLink} className="text-white" >{this.props.t(this.props.buttonTitle)}</Link>
                                        </Button>
                                }
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(Breadcrumbs);
