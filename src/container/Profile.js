import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import _ from 'lodash';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getUploads} from "../actions/action.upload";

import ImageCard from "../component/Image.Card";
import VideoCard from "../component/Video.Card";

export class Profile extends Component {
  componentDidMount() {
    this.props.getUploads();
    this.props.getUser(this.props.auth.currentUser.uid);
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
    const {profile, images, videos, loading} = this.props;

    if(loading &&(!images.length || !videos.length)) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(this.props.auth.currentUser) || this.props.auth.error){
      return <Redirect to="/" />
    }

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
      </div>
        );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.user.data.profile,
  images: state.user.data.images,
  videos: state.user.data.videos,
  loading: state.user.data.loading && state.auth.data.loading
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUploads})(Profile);