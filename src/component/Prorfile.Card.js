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
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-lg-8">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-auto">
                  <figure className="image">
                    <img
                      className="img-thumbnail"
                      style={{width: '250px'}}
                      src={profile.avatar.url}
                      alt="Placeholder"/>
                  </figure>
                </div>
                <div className="col-sm-6">
                  <p className="title is-4">{profile.name}</p>
                  <p className="subtitle is-6">@{profile.username}</p>
                  <p className="text">{profile.bio}</p>
                  <div>
                    <a type='email'>{profile.email}</a>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={this.openLinkModal}>Link</button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={this.openEditModal}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex">
            <div className="container-fluid">
              <div className="row">
                <div className="col m-auto">Points</div>
                <div className="col m-auto">Followers</div>
                <div className="col m-auto">Following</div>
            </div>
          </div>
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