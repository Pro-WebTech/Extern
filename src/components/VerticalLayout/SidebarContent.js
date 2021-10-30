import React, { Component } from "react";

// MetisMenu
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
       
    }
    
    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }
    render() {
        const menus = this.props.menus;
        // console.log("-----menus-------", menus);
        return (
            <React.Fragment>
                 <div id="sidebar-menu">

                        <ul className="metismenu list-unstyled" id="side-menu">

                            <li className="menu-title">{this.props.t('Menu')}</li>

                            <li>
                                <Link to="/dashboard" className="waves-effect">
                                    <i className="ri-dashboard-line"></i><span className="badge badge-pill badge-success float-right"></span>
                                    <span className="ml-1">{this.props.t('Dashboard')}</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/#" className="waves-effect">
                                    <span className="ml-1">{menus.description}</span>
                                </Link>
                            </li>
                            { menus.menus&&
                                menus.menus.map((item, key) =>
                                <li key ={item.id}>
                                    <Link to={item.link} className="waves-effect">
                                        <i className="ri-dashboard-line"></i><span className="badge badge-pill badge-success float-right"></span>
                                        <span className="ml-1">{item.description}</span>
                                    </Link>
                                </li>
                                    
                                )
                            }
                        </ul>
                    </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {  ...state.Layout, ...state.User };
  };

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
})(withNamespaces()(SidebarContent)));
