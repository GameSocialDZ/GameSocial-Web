import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteView, getViewPromise, getView} from "../actions/action.view";
import {getUserPromise} from '../actions/action.user';
import {getFollowingPromise, getFollowing} from "../actions/action.following";
import {getFollowersPromise, getFollowers} from "../actions/action.followers";

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

    // Handle following change to toggle follow/unfollow button
    if(this.state.initState && nextProps.following.data !== this.state.following) {
      this.setState({loadingFollowing: true});
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({
          following: this.props.following.data,
          loadingFollowing: false
        })
      });
    }

    // Handle Login on view page
    if(this.state.initState && !_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({loadingFollowers: true, loadingFollowing: true});

      //this.props.getFollowers(nextProps.auth.currentUser.uid);
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({
          following: this.props.following.data,
          loadingFollowing: false
        })
      });

      //this.props.getFollowing(nextProps.auth.currentUser.uid);
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false})
      });
    }

      this.setState({initState: false})
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

    //this.props.getView(params.uploadId, params.type + 's');
    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({loadingView: false})
    });

    //this.props.getUser(params.userId);
    this.props.getUserPromise(params.userId).then((user) => {
      console.log(user);
      this.setState({loadingUser: false})
    });

    if(!_.isEmpty(auth.currentUser)) {
      //this.props.getFollowing(auth.currentUser.uid);
      this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({
          following: this.props.following,
          loadingFollowing: false
        })
      });
      //this.props.getFollowers(auth.currentUser.uid);
      this.props.getFollowersPromise(auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false})
      });
    }

    this.setState({initState: true})
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
  {deleteView, getViewPromise, getView, getUserPromise,
    getFollowingPromise, getFollowersPromise, getFollowing, getFollowers})
(View);