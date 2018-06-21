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

  componentWillReceiveProps(nextProps) {
    // Handle Login on view page
    if(!_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({loadingFollowers: true, loadingFollowing: true});
      // Get auth following
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({loadingFollowing: false, initState: true})
      });
      // Get auth Followers
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false, initState: true})
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
    const {match: {params}, auth, view} = this.props;
    // Get view data

    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({loadingView: false})
    });
    // Get publisher as user
    this.props.getUserOncePromise(params.userId).then((user) => {
      console.log(user);
      this.setState({loadingUser: false})
    });

    // Get Auth info if logged in
    if(!_.isEmpty(auth.currentUser)) {
      // Get auth Following
      this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({loadingFollowing: false})
      });
      // Get Auth Followers
      this.props.getFollowersPromise(auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false})
      });
    }
    this.setState({initState: true})
  }

  render() {
    const {view} = this.props;

    if (this.state.loadingView) {
      return <h1 style={{marginTop: '4.5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '4.5rem', backgroundColor: 'dimgray'}}>
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
    getFollowingPromise, getFollowersPromise, getFollowing, getFollowers})
(View);