import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getUploads} from "../actions/action.upload";

import CardProfile from "../component/Card.Profile";

export class Profile extends Component {
  componentDidMount() {
    this.props.getUploads();
    this.props.getUser(this.props.auth.currentUser.uid);
  }

  renderUserPictures(pictures) {
    return _.map(pictures, (pic) => {
      return (
        <CardProfile
          key={pic.id}
          upload={pic} />
      )
    });
  }

  render() {
    if(this.props.auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(this.props.auth.currentUser) || this.props.auth.error){
      return <Redirect to="/" />
    }

    const {profile, pictures} = this.props;

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={profile.avatar} alt="Placeholder"/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{profile.name}</p>
                <p className="subtitle is-6">@{profile.username}</p>
              </div>
            </div>

            <div className="content">
              <a type='email'>{profile.email}</a>
              <Link style={{float: 'right'}} to="/profile/update">Edit</Link>
            </div>
          </div>
        </div>
        <div className="album py5 bg-light">
          <div className="container">
            <div className="row">
              {this.renderUserPictures(pictures)}
            </div>
          </div>
        </div>
      </div>
        );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.user.data.profile,
  uploads: state.uploads,
  pictures: state.user.data.pictures
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUploads})(Profile);