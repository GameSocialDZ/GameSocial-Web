import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Icon, Dropdown, Input, tagOptions, Button, Menu} from 'semantic-ui-react';

import ModalUpload from './Modal/Modal.Upload';
import ModalRegister from './Modal/Modal.Register';

import {signOut } from "../actions/action.auth";
import {getUser} from "../actions/action.user";

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderSearchDropDown = () => {
    return(
    <Dropdown text='Search' multiple icon='dropdown'>
      <Dropdown.Menu>
        <Input icon='search' iconPosition='left' className='search' />
      </Dropdown.Menu>
    </Dropdown>
    )
  };

  render() {
    const { activeItem } = this.state;
    const { currentUser } = this.props;
    return (
      <Menu fixed={'top'}>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Link to="/">
            <img style={{width: '50px'}} src="https://www.showwp.com/wp-content/uploads/2016/02/fox-gradient.png"/>
          </Link>
        </Menu.Item>
        <Menu.Item name='feed' active={activeItem === 'feed'} onClick={this.handleItemClick}>
          <Link to="/feed">Feed</Link>
        </Menu.Item>
        <Menu.Item>
          {this.renderSearchDropDown()}
        </Menu.Item>
          {
            _.isEmpty(currentUser) ? (
              <Menu.Menu position='right'>
                <Menu.Item>
                  <ModalRegister/>
                </Menu.Item>
              </Menu.Menu>
            ):(
              <Menu.Menu position='right'>
                <Menu.Item name='signout' active={activeItem === 'signout'} onClick={this.handleItemClick}>
                  <Link to="/" onClick={() => signOut()}>SignOut</Link>
                </Menu.Item>
                <Menu.Item>
                  <ModalUpload/>
                </Menu.Item>
                <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
                  <Button>
                    <Link to="/profile">Profile</Link>
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            )
          }
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {signOut, getUser})(MenuHeader);