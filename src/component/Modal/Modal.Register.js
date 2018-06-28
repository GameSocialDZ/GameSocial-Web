import React, {Component} from 'react'
import {connect} from 'react-redux';
import { Button, Header, Image, Icon, Modal, Menu } from 'semantic-ui-react'

import FormLogin from '../Form/Form.Login';
import FormRegister from '../Form/Form.Register';

import {getUserOnce} from '../../actions/action.user';

class ModalRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'Login'
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderRegisterMenu(activeItem) {
    return (
    <Menu tabular>
      <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} />
      <Menu.Item name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick} />
    </Menu>
    );
  }

  render() {
    const {activeItem} = this.state;
    return (
    <Modal trigger={<Button color={'orange'}>Register</Button>}>
      {this.renderRegisterMenu(activeItem)}
      <Modal.Content image>
        <Modal.Description>
          {
            activeItem === 'Login' ?
              (
                <FormLogin/>
              ):(
                <FormRegister/>
              )
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});


export default connect(mapStateToProps, {getUserOnce})(ModalRegister)
