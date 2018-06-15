import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteView, getViewPromise, getView} from "../actions/action.view";
import {getUserPromise, getUserOncePromise} from '../actions/action.user';
import {getFollowingPromise, getFollowing} from "../actions/action.following";
import {getFollowersPromise, getFollowers} from "../actions/action.followers";

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'view',
      loadingView: true
    }
  }

  /////*****Will receive Next Props for when user logs in on view page*****/////
  componentWillReceiveProps(nextProps) {

    // Handle Login on view page
    if(!_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({loadingFollowers: true, loadingFollowing: true});

      //this.props.getFollowers(nextProps.auth.currentUser.uid);
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({loadingFollowing: false})
      });

      //this.props.getFollowing(nextProps.auth.currentUser.uid);
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false})
      });
    }
  }

  // Set the initial state
  componentWillMount() {
    this.setState({
      page: 'view',
      loadingView: true
    })
  }

  // Handles Refresh
  componentDidMount() {
    const {match: {params}, auth} = this.props;

    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({loadingView: false})
    });

    this.props.getUserOncePromise(params.userId).then((user) => {
      console.log(user);
      this.setState({loadingUser: false})
    });

    if(!_.isEmpty(auth.currentUser)) {
      this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({loadingFollowing: false})
      });
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
              page={this.state.page}
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              page={this.state.page}
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
  {deleteView, getViewPromise, getView, getUserPromise,getUserOncePromise,
    getFollowingPromise, getFollowersPromise, getFollowing, getFollowers})
(View);