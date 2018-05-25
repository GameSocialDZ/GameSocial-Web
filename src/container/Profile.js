import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header} from 'semantic-ui-react';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ImageCard from "../component/Image.Card";
import VideoCard from "../component/Video.Card";
import ProfileCard from "../component/Prorfile.Card";
import ProfileModal from "../component/Profile.Modal";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalType: null
    }
  }

  componentWillMount() {
    this.props.getUser(this.props.currentUser.uid)
  }

  renderProfile(profile) {
    return(
      <ProfileCard
        profile={profile}/>
    );
  }

  renderUserImages(images) {
    return _.map(images, (image) => {
      return (
        <Grid.Column key={image.id}>
          <ImageCard
            image={image}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  renderUserVideos(videos) {
    return _.map(videos, (video) => {
      return (
        <Grid.Column key={video.id}>
          <VideoCard
            video={video}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  render() {
    const {profile, images, videos, user, auth, currentUser} = this.props;

     if (user.loading || auth.loading) {
      return <Header as={'h1'}>Loading...</Header>
    } else if (_.isEmpty(currentUser) || auth.error){
      return <Redirect to="/" />
    }

    return (
      <div>
        <div>
          {this.renderProfile(profile)}
        </div>
        <Grid stackable columns={3} divided>
          <Grid.Row>
            {this.renderUserImages(images)}
          </Grid.Row>
        </Grid>
        <Grid stackable columns={3} divided>
          <Grid.Row>
            {this.renderUserVideos(videos)}
          </Grid.Row>
        </Grid>
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