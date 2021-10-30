import React, { Component } from "react";

import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

import logosmlight from "../../assets/images/logo-sm-light.png";
import logolight from "../../assets/images/logo-light.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      isSocialPf: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }


  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">

                        <div className="navbar-brand-box">

                            <Link to="#" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logosmlight} alt="" height="40"/>
                                </span>
                                <span className="logo-lg">
                                    <img src={logolight} alt="" height="40"/>
                                </span>
                            </Link>
                        </div>

                        <Button size="sm" color="none" type="button" onClick={this.toggleMenu} className="px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                            <i className="ri-menu-2-line align-middle"></i>
                        </Button>

                        <Button color="none" className="px-3 font-size-24 header-item waves-effect">{ "Dashboard" }</Button>
                    </div>

                      <div className="d-flex">

                        <div className="dropdown d-inline-block d-lg-none ml-2">
                            <button type="button" onClick={() => { this.setState({ isSearch: !this.state.isSearch }); }}  className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown">
                                <i className="ri-search-line"></i>
                            </button>
                            <div className={ this.state.isSearch === true ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"}
                                aria-labelledby="page-header-search-dropdown">

                                <Form className="p-3">
                                    <FormGroup className="m-0">
                                        <InputGroup>
                                            <Input type="text" className="form-control" placeholder={this.props.t('Search')}/>
                                            <InputGroupAddon addonType="append">
                                                <Button color="primary" type="submit"><i className="ri-search-line"></i></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>

                        <div className="d-inline-block">
                          <Button type="button" className="header-item noti-icon right-bar-toggle waves-effect btn-box">
                            FAZER UPGRADE DO SEU PLANO
                          </Button>
                        </div>
                        <div className="dropdown d-inline-block">

                        </div>

                        <div className="vertical-line"></div>

                        <ProfileMenu/>

                    </div>
                </div>
            </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withNamespaces()(Header));
