import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ImageCard from "../component/Image.Card";
import VideoCard from "../component/Video.Card";
import {ProfileCard} from "../component/Prorfile.Card";
import ProfileModal from "../component/Profile.Modal";

export class Profile extends Component {
  renderProfile(profile) {
    return(
      <ProfileCard
        profile={profile}/>
    );
  }

  renderUserImages(images) {
    return _.map(images, (image) => {
      return (
        <ImageCard
          key={image.id}
          image={image}
          history={this.props.history}/>
      )
    });
  }

  renderUserVideos(videos) {
    return _.map(videos, (video) => {
      return (
        <VideoCard
          key={video.id}
          video={video}
          history={this.props.history}/>
      )
    });
  }

  render() {
    const {profile, images, videos, user, auth, currentUser} = this.props;

     if (user.loading || auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(currentUser) || auth.error){
      return <Redirect to="/" />
    }

    return (
      <div>
        {this.renderProfile(profile)}
        <div className="album py5 bg-light">
          <div className="container">
            <div className="row">
              {this.renderUserImages(images)}
            </div>
          </div>
        </div>
        <div className="album py5 bg-light">
          <div className="container">
            <div className="row">
              {this.renderUserVideos(videos)}
            </div>
          </div>
        </div>
        <ProfileModal/>
      </div>
        );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  profile: state.user.data.profile,
  currentUser: state.auth.currentUser,
  images: state.user.data.images,
  videos: state.user.data.videos,
});

export default connect(mapStateToProps,
  {getAuth, getUser})(Profile);