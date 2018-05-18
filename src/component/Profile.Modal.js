import React, {Component} from 'react';
import ReactModal from 'react-modal';

import CommonBox from '../component/Common.Box';
import FormEditProfile from './Form.EditProfile';

class ProfileModal extends Component {
  renderEditModal = () => {
    return (
      <div>
        <FormEditProfile/>
      </div>
    );

  };

  renderLinkModal = () => {
    return(
      <div className="col-sm-12">
        <div><button className="btn btn-success w-100">Link Microsoft Account</button></div>
        <br/><div><button className="btn btn-primary w-100">Link Sony Account</button></div>
        <br/><div><button className="btn btn-secondary w-100">Link Steam Account</button></div>
        <br/><div><button className="btn btn-danger w-100">Link Nintendo Account</button></div>
        <br/><div><button
          // onClick={this.props.FacebookLogin}
          className="btn btn-primary w-100">Link Facebook Account</button></div>
        <br/><div><button
          // onClick={this.props.TwitterLogin}
          className="btn btn-success w-100">Link Twitter Account</button></div>
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
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
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

export default ProfileModal;