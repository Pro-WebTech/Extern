import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// users
import avatar2 from '../../../assets/images/users/image.png';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    backToLogin = () => {
        this.props.history.push(`/logout`);
    }
    goToEditProfile = () => {
        this.props.history.push(`/edit-profile`);
    }
    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {
        return (
            <React.Fragment>
                        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                            <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                                <img className="rounded-circle header-profile-user mr-1" src={avatar2} alt="Header Avatar"/>
                                <span style={{fontFamily:"Arial", fontSize:"18px", fontWeight:"700", lineHeight:"24px"}}>{this.props.username}</span>
                                <i className="mdi mdi-chevron-down d-none ml-1 d-xl-inline-block"></i>
                                <br/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.goToEditProfile}><i className="ri-user-line align-middle mr-1"></i> Editar informações do perfil</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem className="text-danger"  onClick={this.backToLogin}><i className="ri-shut-down-line align-middle mr-1 text-danger"></i> Sair do sistema</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { layoutType } = state.Layout;
    const { username } = state.User;
    return { layoutType, username };
  };

export default withRouter(connect(mapStatetoProps)(ProfileMenu));
