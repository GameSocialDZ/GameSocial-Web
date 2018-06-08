import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser, getUserPromise} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ProfileDetail from "../component/ProfileDetails";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProfile: false,
      userProfile: null,
      initState: false
    }
  }

  componentWillMount(){
    console.log('Component Will Mount')
  }

  componentWillUnmount() {
    console.log('Component Will Unmount');
  }

  //Set the initial State
  // componentWillMount() {
  //   const {match: {params}} = this.props;
  //   if(this.state.loadingProfile === false) {
  //     this.setState({loadingProfile: true});
  //     this.props.getUserPromise(params.userId).then((userInfo) => {
  //       console.log(userInfo);
  //       this.setState({userProfile: userInfo})
  //     });
  //   }
  // }

  // Decide if we are on our or otherUser profile before render
  componentWillReceiveProps(nextProps) {
    const {match: {params}} = this.props;


    // if(this.state.initState && this.state.userProfile && this.state.userProfile.id !== nextProps.match.params.userId) {
    //   this.setState({loadingProfile: false, intiState: false});
    //   this.props.getUserPromise(params.userId).then(() => {
    //     this.setState({userProfile: this.props.user.data})
    //   });
    // }

    //Handles Same Page different User
    if(this.state.initState && this.state.userProfile && this.state.userProfile.id !== nextProps.match.params.userId){
      this.setState({loadingProfile: true, initState: false});
      this.props.getUserPromise(nextProps.match.params.userId).then((user) => {
        this.setState({
          userProfile: user.data
        })
      });
    }

    // if(this.state.userProfile && nextProps.user && nextProps.user.data && (nextProps.user.data.id === this.state.userProfile.data.id) && !_.isEqual(nextProps.user, this.state.userProfile)) {
    //   this.updatePageDetails(nextProps.user);
    // }
  }

  // Handles refresh
  componentDidMount() {
    const {match: {params}} = this.props;
    if(this.state.loadingProfile === false) {
      this.setState({loadingProfile: true});
      this.props.getUserPromise(params.userId).then((user) => {
        console.log(user);
        this.setState({
          userProfile: this.props.user.data,
          loadingProfile: false,
          initState: true
        })
      })
    }
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

  noLoad = () => {
    this.setState({
      loadingProfile: false,
      initState: true,
      userProfile: this.props.user.data
    })
  };

  render() {
    const {user} = this.props;

    return (
    <div style={{marginTop: '5rem'}}>
      {
        this.state.loadingProfile === false && !_.isEmpty(this.state.userProfile) ? (
        <ProfileDetail
          noLoad={this.noLoad}
          history={this.props.history}
          user={user}
          images={user.data.images}
          videos={user.data.videos}
          following={user.data.following}
          followers={user.data.followers}
        />
        ):(
          <Header style={{marginTop: '5rem'}} as={'h1'}>Loading...</Header>
        )
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps,
  {getAuth, getUser, getUserPromise})(Profile);