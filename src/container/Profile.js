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
  }

  //TODO: Only get uploads for specific user
  renderUserUploads(uploads) {
    return _.map(uploads.data, (upload) => {
      return (
        <CardProfile
          key={upload.id}
          upload={upload} />
      )
    });
  }

  render() {
    if(this.props.auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(this.props.auth.currentUser) || this.props.auth.error){
      return <Redirect to="/" />
    }

    const {profile, uploads} = this.props;

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
        {this.renderUserUploads(uploads)}
      </div>
        );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.user.data.profile,
  uploads: state.uploads
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUploads})(Profile);