import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteView, getViewPromise} from "../actions/action.view";
import {getUserPromise} from '../actions/action.user';
import {getFollowingPromise} from "../actions/action.following";
import {getFollowersPromise} from "../actions/action.followers";

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      view: null,
      follow: null,
      loadingView: true,
      loadingUser: true,
      loadingFollowing: true,
      loadingFollowers: true,
      initState: true
    }
  }

  /////*****Will receive Next Props for when user logs in on view page*****/////
  componentWillReceiveProps(nextProps) {
      console.log(nextProps);

      //TODO: Handle login on view page
      if(!_.isEmpty(nextProps.auth.currentUser)){
        console.log('Logged in');
      }
  }

  // Set the initial state
  componentWillMount() {
    this.setState({
      loadingView: true,
      initState: true
    })
  }

  // Handles Refresh
  componentDidMount() {
    const {match: {params}, auth} = this.props;
    // Get upload state
    // then =>
    // Get the publisher state
    // then =>
    // Get the following and followers state if logged in
    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({
        view: this.props.view.data,
        loadingView: false,
        initState: true,
      })
    }).then(() => {
      this.props.getUserPromise(params.userId).then((user) => {
        console.log(user);
        this.setState({
          user: this.props.user.data,
          loadingUser: false,
          initState: true,
        })
      });
    }).then(() => {
      if(!_.isEmpty(auth.currentUser)) {
        this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
          console.log(following);
          this.setState({
            following: this.props.following.data,
            loadingFollowing: false,
            initState: true,
          })
        });
      }
    }).then(() => {
      if(!_.isEmpty(auth.currentUser)) {
        this.props.getFollowersPromise(auth.currentUser.uid).then((followers) => {
          console.log(followers);
          this.setState({
            followers: this.props.followers.data,
            loadingFollowers: false,
            initState: true,
          })
        });
      }
    });
  }

  render() {
    const {view, user, followers, following} = this.props;

    if (this.state.loadingView) {
      return <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        {view.data.config.type === 'image' ? (
          <div className="">
            <ImageView
              user={user}
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              user={user}
              video={view.data}/>
          </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  view: state.view,
  following: state.following,
  followers: state.followers
});

export default connect(mapStateToProps,
  {deleteView, getViewPromise, getUserPromise, getFollowingPromise, getFollowersPromise})
(View);