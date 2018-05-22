import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalView from "./Profile.Modal";

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalType: null
    }
  }

  openLinkModal = () => {
    this.setState({modalIsOpen: true});
    this.setState({modalType: 'link'});
  };
  openEditModal = () => {
    this.setState({modalIsOpen: true});
    this.setState({modalType: 'edit'});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };


  render() {
    const {profile} = this.props;
    const {modalType, modalIsOpen} = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  className="img-thumbnail"
                  style={{maxWidth: '250px'}}
                  src={profile.avatar.url}
                  alt="Placeholder"/>
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{profile.name}</p>
              <p className="subtitle is-6">@{profile.username}</p>
              <p className="text">{profile.bio}</p>
            </div>
          </div>

          <div className="content">
            <a type='email'>{profile.email}</a>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              style={{position: 'absolute', top: '0px', right: '0px'}}
              onClick={this.openLinkModal}>Link</button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              style={{position: 'absolute', bottom: '0px', right: '0px'}}
              onClick={this.openEditModal}>Edit</button>
          </div>
        </div>
          <ModalView
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
            modalType={modalType}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileCard);