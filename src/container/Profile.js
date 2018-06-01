import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';
import {getOtherUser, deleteOtherUser} from "../actions/action.otherUser";

import ProfileDetail from "../component/ProfileDetails";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtherUser: true,
      user: this.props.user,
      otherUser: this.props.otherUser
    }
  }

  // Set the initial State
  componentWillMount() {
    this.setState({
      user: this.props.user,
      otherUser: this.props.otherUser
    })
  }

  // Decide if we are on our or otherUser profile before render
  componentWillReceiveProps(nextProps) {
    if(_.isEmpty(nextProps.otherUser.data)){
      this.setState({
        isOtherUser: false
      })
    } else if(_.isEmpty(nextProps.user.data)){
      this.setState({
        isOtherUser: true
      })
    } else if (nextProps.otherUser.data.id !== this.props.auth.currentUser.uid){ //nextProps.user.data.id){
      this.setState({
        isOtherUser: true
      })
    }else if(nextProps.otherUser.data.id === this.props.auth.currentUser.uid){ //nextProps.user.data.id) {
      if(!_.isEmpty(nextProps.user)){
        this.setState({
          isOtherUser: false
        })
      }
    }
  }

  // Get otherUser w/ .on call as we only get user once on UserCard profile button click
  componentDidMount() {
    //TODO: Get otherUser on profile page for updates
    this.props.getOtherUser(this.state.otherUser.data.id);
    if(!_.isEmpty(this.props.user.currentUser)) {
      this.props.getUser(this.state.user.data.id);
    }
  }

  // Remove otherUser if exist from profile on page switch
  componentWillUnmount() {
    if(!_.isEmpty(this.props.otherUser.data)){
      this.props.deleteOtherUser();
    }
  }

  render() {
    const {user, otherUser} = this.props;

    if (user.loading) {
      return <Header style={{marginTop: '5rem'}} as={'h1'}>Loading...</Header>
    }

    if (otherUser.loading) {
      return <Header style={{marginTop: '5rem'}} as={'h1'}>Loading...</Header>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        {
          this.state.isOtherUser &&
            <ProfileDetail
              history={this.props.history}
              user={otherUser}
              images={otherUser.data.images}
              videos={otherUser.data.videos}
              following={otherUser.data.following}
              followers={otherUser.data.followers}/>
        }
        {
          !this.state.isOtherUser &&
            <ProfileDetail
              history={this.props.history}
              user={user}
              images={user.data.images}
              videos={user.data.videos}
              following={user.data.following}
              followers={user.data.followers}/>
        }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  otherUser: state.user2,
});

export default connect(mapStateToProps,
  {getAuth, getUser, getOtherUser, deleteOtherUser})(Profile);