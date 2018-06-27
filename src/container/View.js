import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteView, getViewPromise, getView} from "../actions/action.view";
import {getUserPromise, getUserOncePromise} from '../actions/action.user';
import {getFollowingPromise, getFollowingOnce} from "../actions/action.following";
import {getFollowersPromise, getFollowersOnce} from "../actions/action.followers";
import {getFavoritesOnce, getFavoritesPromise} from "../actions/action.favorite";
import {getTrackedFavoritesOnce, getTrackedFavoritesPromise} from '../actions/action.track.favorites';
import {getPlaylistPromise, getPlaylistOnce} from "../actions/action.playlist";

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingView: true
    }
  }

  componentWillReceiveProps(nextProps) {
    const {view} = this.props;
    // Handle Login on view page
    if(!_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({initState: false});
      // Get auth following
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true})
      });
      // Get auth Followers
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true})
      });
      // Get auth favorites
      this.props.getFavoritesPromise(nextProps.auth.currentUser.uid, view.data.id).then(() => {
        this.setState({initState: true})
      });
      // Get Tracked favorites
      this.props.getTrackedFavoritesPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true})
      });
      // Get Playlist
      this.props.getPlaylistPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true})
      });
    }
  }

  // Set the initial state
  componentWillMount() {
    this.setState({
      loadingView: true
    })
  }

  // Handles Refresh
  componentDidMount() {
    const {match: {params}, auth, view} = this.props;
    // Get view data
    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({loadingView: false})
    });

    // Get Auth info if logged in
    if(!_.isEmpty(auth.currentUser)) {
      // Get auth Following
      this.props.getFollowingOnce(auth.currentUser.uid);
      // Get Auth Followers
      this.props.getFollowersOnce(auth.currentUser.uid);
      // Get Auth Favorites
      this.props.getFavoritesOnce(auth.currentUser.uid, view.data.id);
      // Get Tracked Favorites List
      this.props.getTrackedFavoritesOnce(auth.currentUser.uid);
      // Get Playlist
      this.props.getPlaylistOnce(auth.currentUser.uid)
    }
    this.setState({initState: true})
  }

  render() {
    const {view} = this.props;

    if (this.state.loadingView) {
      return <h1 style={{marginTop: '5.5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5.5rem', backgroundColor: 'dimgray'}}>
        {view.data.config.type === 'image' ? (
          <div>
            <ImageView
              page={this.state.page}
              image={view.data}/>
          </div>
        ):(
          <div>
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
    getFollowingPromise, getFollowersPromise, getFollowingOnce, getFollowersOnce,
    getFavoritesOnce, getFavoritesPromise, getTrackedFavoritesOnce, getTrackedFavoritesPromise,
    getPlaylistPromise, getPlaylistOnce})
(View);