import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ProfileDetail from "../component/ProfileDetails";

// import ImageCard from "../component/Card/Image.Card";
// import VideoCard from "../component/Card/Video.Card";
// import ProfileCard from "../component/Card/Prorfile.Card";
// import MenuProfile from "../component/Menu/Menu.Profile";
// import UserCard from '../component/Card/User.Card';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {images, videos, user, following, auth, followers, otherUser, otherUserData} = this.props;



    if (user.loading) {
      return <Header as={'h1'}>Loading...</Header>
    }

    if (otherUser.loading) {
      return <Header as={'h1'}>Loading...</Header>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        {
          this.props.otherUser.isOtherUser &&
            <ProfileDetail
              history={this.props.history}
              user={otherUser}
              images={otherUserData.images}
              videos={otherUserData.videos}
              following={otherUserData.following}
              followers={otherUserData.followers}/>
        }
        {
          !this.props.otherUser.isOtherUser &&
            <ProfileDetail
              history={this.props.history}
              user={user}
              images={images}
              videos={videos}
              following={following}
              followers={followers}/>
        }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  currentUser: state.auth.currentUser,
  images: state.user.data.images,
  videos: state.user.data.videos,
  following: state.user.data.following,
  followers: state.user.data.followers,
  otherUser: state.other_user,
  otherUserData: state.other_user.data
});

export default connect(mapStateToProps,
  {getAuth, getUser})(Profile);