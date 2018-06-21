import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { Icon, Button } from 'semantic-ui-react';

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
      isFollower: false
    }

    console.log("follow")
  }

  componentDidMount(){
    this.checkFollowing();
    this.checkFollowers();
  }

  handleFollowing(){

    if(this.state.isFollowing){
      //Remove
      this.toggleFollowing(false);
    }else{
      //Add
      this.toggleFollowing(true);
    }
  }

  checkFollowing(){
    let thisCompnent = this;
    let followingRef = firebase.database().ref("users/"+this.props.userId+"/following/"+this.props.publisherId);
    followingRef.once('value', following => {
      let isFollowing = (following.val()) ? true : false;
      thisCompnent.setFollowState(isFollowing);
    });
  }

  checkFollowers(){
    let thisCompnent = this;
    let followerRef = firebase.database().ref("users/"+this.props.publisherId+"/followers/"+this.props.userId);
    followerRef.once('value', followers => {
      let isFollower = (followers.val()) ? true : false;
      thisCompnent.setFollowState(isFollower);
    });
  }

  toggleFollowing(enableFollow){
    this.setFollowing(enableFollow);
    this.setFollower(enableFollow);
    this.setFollowState(enableFollow);
  }

  setFollowing(val){
    let usersRef = firebase.database().ref("users/"+this.props.userId+"/following");
    if(val){
      usersRef.child(this.props.publisherId).set(val);
    }else{
      usersRef.child(this.props.publisherId).remove();
    }
  }

  setFollower(val){
    let usersRef = firebase.database().ref("users/"+this.props.publisherId+"/followers");

    if(val){
      usersRef.child(this.props.userId).set(val);
    }else{
      usersRef.child(this.props.userId).remove();
    }
  }

  setFollowState(val){
    this.setState({isFollowing: val});
  }

  render() {
    return this.state.isFollowing ? (
      <Button icon basic color='green' size='small' floated={(this.props.floated)? this.props.floated: 'right'} onClick={this.handleFollowing.bind(this)}><span>Unfollow</span></Button>
    ):(
      <Button icon color='green' className='dynamic' size='small' floated={(this.props.floated)? this.props.floated: 'right'} onClick={this.handleFollowing.bind(this)}><span>Follow</span></Button>
    );
  }
}

export default connect (null, { })(Follow);