import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Icon, Dropdown, Input, tagOptions, Button, Menu, Image} from 'semantic-ui-react';

import ModalUpload from '../Modal/Modal.Upload';
import ModalRegister from '../Modal/Modal.Register';

import {signOut } from "../../actions/action.auth";
import {getUser, getUserOnce} from '../../actions/action.user';

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    }
  }

  componentWillReceiveProps(nextProps){

  }

  handleItemClick = (e, { name }) => this.setState({ activeMenu: name });

  renderSearchDropdown = () => {
    return(
    <Dropdown text='Search' multiple icon='dropdown'>
      <Dropdown.Menu>
        <Input icon='search' iconPosition='left' className='search' />
      </Dropdown.Menu>
    </Dropdown>
    )
  };

  // getProfile() {
  //   this.props.getUserOnce(this.props.currentUser.uid);
  // }

  renderProfileDropdown = () => {
    const {currentUser} = this.props;
    const trigger = (
      <span>
        <Image avatar src={currentUser.photoURL} /> {currentUser.displayName}
      </span>
    );

    return(
      <Dropdown trigger={trigger}>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to={`/profile/${currentUser.uid}`}>Profile</Link>
          </Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item
            text='Sign Out'
            onClick={() => this.props.signOut()}>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  };

  render() {
    const { activeItem } = this.state;
    const { currentUser } = this.props;

    return (
      <Menu fixed={'top'}>
        <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          <img style={{width: '50px'}} src="https://www.showwp.com/wp-content/uploads/2016/02/fox-gradient.png"/>
        </Menu.Item>
        <Menu.Item as={Link} to='/feed' name='feed' active={activeItem === 'feed'} onClick={this.handleItemClick}>
        </Menu.Item>
        <Menu.Item>
          {this.renderSearchDropdown()}
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
                <Menu.Item>
                  <ModalUpload/>
                </Menu.Item>
                  {
                    this.props.auth.loading ? (
                      <Menu.Item>
                        <Dropdown text='Dropdown' loading />
                      </Menu.Item>
                    ):(
                      <Menu.Item>
                        {this.renderProfileDropdown()}
                      </Menu.Item>
                    )
                  }
              </Menu.Menu>
            )
          }
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  auth: state.auth
});

export default connect(mapStateToProps,
  {signOut, getUser, getUserOnce})(MenuHeader);