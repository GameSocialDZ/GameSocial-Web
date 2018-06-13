import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUserOnce, getUserPromise} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getFollowersPromise} from '../actions/action.followers';
import {getFollowingPromise} from '../actions/action.following';

import ProfileDetail from "../component/ProfileDetails";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProfile: true,
      userProfile: null,
      initState: true,
      follow: null,
      loadingFollowing: true,
      loadingFollowers: true,
    }
  }

  //Set the initial State
  componentWillMount() {
    this.setState({
      loadingProfile: true,
      initState: true
    });
  }

  // Decide if we are on our or otherUser profile before render
  componentWillReceiveProps(nextProps) {
    const {match: {params}} = this.props;

    //TODO: Handle login on view page
    if(!_.isEmpty(nextProps.auth.currentUser)){
      console.log('Logged in');
    }

    //Handles Same Page different User
    if(this.state.initState && this.state.userProfile && this.state.userProfile.id !== nextProps.match.params.userId){
      this.setState({loadingProfile: true, initState: false});
      this.props.getUserPromise(nextProps.match.params.userId).then((user) => {
        console.log(user);
        this.setState({
          initState: true,
          loadingProfile: false,
          userProfile: this.props.user.data
        })
      });
    }

    // if(this.state.userProfile && nextProps.user && nextProps.user.data && (nextProps.user.data.id === this.state.userProfile.data.id) && !_.isEqual(nextProps.user, this.state.userProfile)) {
    //   this.updatePageDetails(nextProps.user);
    // }
  }

  // Handles refresh
  componentDidMount() {
    const {match: {params}, auth} = this.props;

    // Get the follow state

    // get the user profile state
    this.props.getUserPromise(params.userId).then((user) => {
      console.log(user);
      this.setState({
        userProfile: this.props.user.data,
        loadingProfile: false,
        initState: true
      })
    }).then(() => {
      if(!_.isEmpty(auth.currentUser)) {
        this.props.getFollowingPromise(auth.currentUser.uid).then((following) => {
          console.log(following);
          this.setState({
            following: this.props.following.data,
            loadingFollowing: false,
            initState: true
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
            initState: true
          })
        });
      }
    });
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

    //this.setState({loadingProfile: false});

    // });
  }

  render() {
    const {user} = this.props;

    if (this.state.loadingProfile) {
      return <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        <ProfileDetail
          history={this.props.history}
          user={user}
          images={user.data.images}
          videos={user.data.videos}
          following={user.data.following}
          followers={user.data.followers}
        />
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
  {getAuth, getUserOnce, getUserPromise, getFollowersPromise, getFollowingPromise})
(Profile);