import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import _ from 'lodash';
import ReactGa from 'react-ga';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser, getUserPromise, getUserOncePromise, getUserOnce} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getFollowersPromise, getFollowersOnce} from '../actions/action.followers';
import {getFollowingPromise, getFollowingOnce} from '../actions/action.following';
import {getTrackedFavoritesPromise, getTrackedFavoritesOnce} from "../actions/action.track.favorites";

import ProfileDetail from "../component/Detail/Detail.Profile";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  //Set the initial State
  componentWillMount() {
    this.setState({
      loadingProfile: true,
      initState: false
    });
  }

  componentWillReceiveProps(nextProps) {
    const {match: {params}} = this.props;

    //Handle Login on profile page
    if(!_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({initState: false});
      // Get Auth Following
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true});
      });
      // Get Auth Followers
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true});
      });
      this.props.getTrackedFavoritesPromise(nextProps.auth.currentUser.uid).then(() => {
        this.setState({initState: true});
      });
    }

    // Same page different user update
    if(this.state.initState && this.props.user.data && this.props.user.data.id !== nextProps.match.params.userId){
      this.setState({loadingProfile: true, initState: false});
      this.props.getUserOncePromise(nextProps.match.params.userId).then((user) => {
        console.log(user);
        this.setState({loadingProfile: false, initState: true});
      });
    }

    // Same page same user update
    if(this.state.initState && this.props.user.data && (this.props.user.data.id === nextProps.match.params.userId)
      && (this.props.user.data !== nextProps.user.data)){
      this.setState({initState: false});
      this.props.getUserOncePromise(nextProps.match.params.userId).then((user) => {
        console.log(user);
        this.setState({loadingProfile: false, initState: true});
      });
    }
  }

  // Handles refresh
  componentDidMount() {
    ReactGa.pageview('/profile');
    const {match: {params}, auth} = this.props;

    this.props.getUserOnce(params.userId);

    // Get Auth info if logged in
    if(!_.isEmpty(auth.currentUser)) {
      this.props.getFollowingOnce(auth.currentUser.uid);
      this.props.getFollowersOnce(auth.currentUser.uid);
      this.props.getTrackedFavoritesOnce(auth.currentUser.uid);
    }
    this.setState({initState: true})
  }

  render() {
    if (this.state.loadingProfile) {
      return <h1 style={{marginTop: '4.5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '4.5rem', backgroundColor: 'dimgray'}}>
        <ProfileDetail
         page={'profile'}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  following: state.following,
  followers: state.followers,
  trackedFavorites: state.trackedFavorites
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUserPromise, getUserOncePromise, getUserOnce,
    getFollowersPromise, getFollowingPromise, getFollowersOnce, getFollowingOnce,
    getTrackedFavoritesPromise, getTrackedFavoritesOnce})
(Profile);