import React, {Component} from 'react';
import ReactModal from 'react-modal';

import {Button} from 'semantic-ui-react';

import CommonBox from '../component/Common.Box';
import FormEditProfile from './Form.EditProfile';

class ModalPopup extends Component {
  renderEditModal = () => {
    return (
      <div>
        <FormEditProfile/>
      </div>
    );

  };

  renderLinkModal = () => {
    return(
      <div>
        <Button fluid>Link Microsoft Account</Button>
        <Button fluid>Link Sony Account</Button>
        <Button fluid>Link Steam Account</Button>
        <Button fluid>Link Nintendo Account</Button>
        <Button fluid
        // onClick={this.props.FacebookLogin}
        >Link Facebook Account</Button>
        <Button fluid
        // onClick={this.props.TwitterLogin}
        >Link Twitter Account</Button>
      </div>
    );
  };

  render() {
    const {modalIsOpen, closeModal, modalType} = this.props;
    return (
      <div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{overFlowY: 'scroll'}}
          contentLabel="Profile Modal"
          ariaHideApp={false}>
          <Button
            type="button"
            as="close"
            aria-label="Close"
            onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </Button>
          {
            modalType === 'link' &&
            <CommonBox
              title='Link Accounts'
              body={this.renderLinkModal()}/>
          }{
            modalType === 'edit' &&
            <CommonBox
              title='Edit Profile'
              body={this.renderEditModal()}/>
          }
        </ReactModal>
      </div>
    );
  }
}

export default ModalPopup;