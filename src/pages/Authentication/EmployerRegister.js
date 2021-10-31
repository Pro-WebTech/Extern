import React, { Component } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Label , Input, Form, FormGroup, Progress, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import classnames from 'classnames';
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Select from "react-select";

const optionGroup = [
	{
		label: "Type",
		options: [
			{ label: "General Medicine", value: "A" },
			{ label: "Dental Practice", value: "B" },
			{ label: "Dental Specialty Office", value: "C" },
			{ label: "Pharmacy", value: "D" },
			{ label: "Hospital", value: "E" },
			{ label: "Nursing Home", value: "F" },
			{ label: "Ambulatory Care", value: "G" },
			{ label: "Surgical Care", value: "H" },
			{ label: "Radiology Center", value: "I" },

		]
	},
    {
		label: "Other",
		options: [
			{ label: "Not Here", value: "NotHere" },
		]
	}
];

class EmployerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        breadcrumbItems : [
           
        ],
      activeTab: 1,
      activeTabProgress: 1,
      progressValue : 33,
      selectedGroup: null,
      modal_static: false,
    };
    this.toggleTab.bind(this);
    this.toggleTabProgress.bind(this);
    this.handleSelectGroup.bind(this);
  }

  toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=4 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
  };

  toggleTabProgress(tab) {
    if (this.state.activeTabProgress !== tab) {
        if(tab >= 1 && tab <= 3 ){
            this.setState({
              activeTabProgress: tab
            });

          if(tab === 1) { this.setState({progressValue : 33}) }
          if(tab === 2) { this.setState({progressValue : 66}) }
          if(tab === 3) { this.setState({progressValue : 100}) }
        }
    }
};

tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard
    }));
    this.removeBodyCss();
};
handleSelectGroup = selectedGroup => {
    if(selectedGroup.value === 'NotHere')
        this.tog_standard();
    this.setState({ selectedGroup });
};
removeBodyCss() {
    document.body.classList.add("no_padding");
};
  render() {
    const { selectedGroup } = this.state;

    return (
      <React.Fragment>
                <div className="page">
                    <Container fluid={true}>
                    <Breadcrumbs title="" breadcrumbItems={this.state.breadcrumbItems} />
                    <Modal
                        isOpen={this.state.modal_standard}
                        toggle={() => this.setState({ modal_standard: false })}
                        >
                        <ModalHeader toggle={() => this.setState({ modal_standard: false })}>
                            
                        </ModalHeader>
                        <ModalBody>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <Label for="basicpill-firstname-input14">New Office Type</Label>
                                    <Input type="text" className="form-control" id="basicpill-firstname-input14"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                            type="button"
                            onClick={() => this.setState({ modal_standard: false })}
                            color="light"
                            className="waves-effect"
                            >
                            Close
                        </Button>
                            <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            >
                            Add
                        </Button>
                        </ModalFooter>
                    </Modal>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title mb-4">Register Employer</h4>

                                        <div id="progrss-wizard" className="twitter-bs-wizard">
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTabProgress === 1 })} onClick={() => { this.toggleTabProgress(1); }} >
                                                    <span className="step-number">01</span>
                                                    <span className="step-title">Identify</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTabProgress === 2 })} onClick={() => { this.toggleTabProgress(2); }} >
                                                    <span className="step-number">02</span>
                                                    <span className="step-title">Phone Verification</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTabProgress === 3 })} onClick={() => { this.toggleTabProgress(3); }} >
                                                    <span className="step-number">03</span>
                                                    <span className="step-title">Employer Details</span>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>

                                            <div id="bar" className="mt-3">
                                                <Progress color="success" striped animated value={this.state.progressValue} />
                                            </div>
                                            <TabContent activeTab={this.state.activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <Form>
                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <Label for="basicpill-firstname-input14">Full Name</Label>
                                                                    <Input type="text" className="form-control" id="basicpill-firstname-input14"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <Label for="basicpill-lastname-input15">Phone</Label>
                                                                    <Input type="text" className="form-control" id="basicpill-lastname-input15"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <Label for="basicpill-firstname-input14">Password</Label>
                                                                    <Input type="text" className="form-control" id="basicpill-firstname-input14"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <Label for="basicpill-lastname-input15">Re-type Password</Label>
                                                                    <Input type="text" className="form-control" id="basicpill-lastname-input15"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg="6">
                                                                <FormGroup>
                                                                    <Label for="basicpill-phoneno-input16">Email</Label>
                                                                    <Input type="text" className="form-control" id="basicpill-phoneno-input16"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        
                                                    </Form>
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                  <div>
                                                    <Form>
                                                        <Row>

                                                            <Col lg="12">
                                                                    <div className="text-center">
                                                                       <Label className="font-size-20 my-1">Verify you're a right candidate to start</Label>
                                                                    </div>
                                                            </Col>

                                                            
                                                        </Row>
                                                        <Row>
                                                            <Col lg={3}></Col>

                                                            <Col lg={6}>
                                                                <FormGroup>
                                                                    <Label for="basicpill-cstno-input20"></Label>
                                                                    <Input type="text" className="form-control" id="basicpill-cstno-input20"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div className="text-center mt-4">
                                                                 <Button color="success" className="btn-rounded waves-effect waves-light mr-1">Submit Code</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        
                                                    </Form>
                                                  </div>
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <Form>
                                                            <Row>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-firstname-input1">Office Name</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-firstname-input1"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-lastname-input2">Office Address</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-lastname-input2"/>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-firstname-input1">Office Contact Name</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-firstname-input1"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-lastname-input2">Office Fax</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-lastname-input2"/>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>


                                                            <Row>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-phoneno-input3">Office Email</Label>
                                                                        <Input type="text" className="form-control" id="basicpill-phoneno-input3"/>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-email-input4">Type of Office</Label>
                                                                        <Select
                                                                            value={selectedGroup}
                                                                            onChange={this.handleSelectGroup}
                                                                            options={optionGroup}
                                                                            classNamePrefix="select2-selection"
                                                                        />                                                                       
                                                                    </FormGroup>
                                                                    
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg="12">
                                                                    <FormGroup>
                                                                        <Label for="basicpill-address-input1">Tell us about your office</Label>
                                                                        <textarea id="basicpill-address-input1" className="form-control" rows="2"></textarea>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                              <Col lg="6">
                                                                  <FormGroup>
                                                                      <Label for="basicpill-card-verification-input26">Office Schedule/Hours</Label>
                                                                      <select className="custom-select">
                                                                            <option defaultValue>7:00am – 4:00pm</option>
                                                                            <option value="VI">8:00am – 5:00pm</option>
                                                                            <option value="VI">9:00am – 6:00pm</option>
                                                                            <option value="VI">10:00am – 7pm</option>
                                                                            <option value="VI">Others</option>

                                                                      </select>
                                                                  </FormGroup>
                                                              </Col>
                                                          </Row>
                                                    </Form>
                                                </TabPane>

                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                <li className={this.state.activeTabProgress === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { this.toggleTabProgress(this.state.activeTabProgress - 1);} }>Previous</Link></li>
                                                <li className={this.state.activeTabProgress === 4 ? "next disabled" : "next"}><Link to="#" onClick={() => { this.toggleTabProgress(this.state.activeTabProgress + 1);} }>Next</Link></li>
                                            </ul>
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

export default EmployerRegister;
 