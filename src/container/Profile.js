import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser, getUserPromise, getUserOncePromise, getUserOnce} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getFollowersPromise, getFollowers} from '../actions/action.followers';
import {getFollowingPromise, getFollowing} from '../actions/action.following';

import ProfileDetail from "../component/ProfileDetails";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  //Set the initial State
  componentWillMount() {
    this.setState({
      page: 'profile',
      loadingProfile: true,
      initState: false
    });
  }

  componentWillReceiveProps(nextProps) {
    const {match: {params}} = this.props;
    console.log(nextProps);

    //Handle Login on profile page
    if(this.state.initState && !_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.setState({loadingFollowers: true, loadingFollowing: true, initState: false});
      // Get Auth Following
      this.props.getFollowingPromise(nextProps.auth.currentUser.uid).then((following) => {
        console.log(following);
        this.setState({loadingFollowing: false, initState: true});
        this.updatePageDetails();
      });
      // Get Auth Followers
      this.props.getFollowersPromise(nextProps.auth.currentUser.uid).then((followers) => {
        console.log(followers);
        this.setState({loadingFollowers: false, initState: true});
        this.updatePageDetails();
      });
    }

    // Same page different user update
    if(this.state.initState && this.props.user.data && this.props.user.data.id !== nextProps.match.params.userId){
      this.setState({loadingProfile: true, initState: false});
      this.props.getUserOncePromise(nextProps.match.params.userId).then((user) => {
        console.log(user);
        this.setState({loadingProfile: false, initState: true});
        this.updatePageDetails();
      });
    }

    // Same page same user update
    if(this.state.initState && this.props.user.data && (this.props.user.data.id === nextProps.match.params.userId)
      && (this.props.user.data !== nextProps.user.data)){
      this.setState({ initState: false});
      this.props.getUserOncePromise(nextProps.match.params.userId).then((user) => {
        console.log(user);
        this.setState({loadingProfile: false, initState: true});
        this.updatePageDetails();
      });
    }

    //TODO: Handle profile page updates
    // if(this.state.userProfile && nextProps.user && nextProps.user.data && (nextProps.user.data.id === this.state.userProfile.data.id) && !_.isEqual(nextProps.user, this.state.userProfile)) {
    //   this.updatePageDetails(nextProps.user);
    // }
  }

  // Handles refresh
  componentDidMount() {
    const {match: {params}, auth, history} = this.props;

    this.props.getUserOncePromise(params.userId).then((user) => {
      console.log(user);
      this.setState({loadingProfile: false});
      this.updatePageDetails();
    });

    // Get Auth info if logged in
    if(!_.isEmpty(auth.currentUser)) {
      this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
        console.log(following);
        // this.setState({loadingFollowing: false})
      });
      this.props.getFollowersPromise(auth.currentUser.uid).then((followers) => {
        console.log(followers);
        // this.setState({loadingFollowers: false})
      });
    }
    this.setState({initState: true})
  }

  updatePageDetails(user){
    // let thisContainer = this;
    // thisContainer.setState({userProfile:user }, () => {
    //
    //   let { userProfile } = thisContainer.state
    //   thisContainer.getUserPoints(userProfile);
    //   thisContainer.getUserTeamList(userProfile);
    //   thisContainer.props.getUserVideos(userProfile.profile.id);
    //
    //
    //   if(userProfile.favorite && userProfile.favorite.videos){
    //     thisContainer.props.getUserFavoriteVideos(userProfile.favorite.videos);
    //   }else{
    //     thisContainer.props.getUserFavoriteVideos({});
    //   }
    //
    //   if(userProfile.favorite && userProfile.favorite.categories){
    //     thisContainer.props.getUserFavoriteSports(userProfile.favorite.categories);
    //   }else{
    //     thisContainer.props.getUserFavoriteSports({});
    //   }
    //   if(userProfile.following){
    //     thisContainer.props.getUserFollowing(userProfile.following);
    //   }else{
    //     thisContainer.props.getUserFollowing({});
    //   }
    //
    //   if(userProfile.followers){
    //     thisContainer.props.getUserFollowers(userProfile.followers);
    //   }else{
    //     thisContainer.props.getUserFollowers({});
    //   }
    //
    // this.setState({loadingProfile: false});
    //
    // });
  }

  render() {
    const {user} = this.props;

    if (this.state.loadingProfile) {
      return <h1 style={{marginTop: '4.5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '4.5rem', backgroundColor: 'dimgray'}}>
        <ProfileDetail/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  following: state.following,
  followers: state.followers
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUserPromise, getUserOncePromise, getUserOnce,
    getFollowersPromise, getFollowingPromise,
    getFollowing, getFollowers})
(Profile);