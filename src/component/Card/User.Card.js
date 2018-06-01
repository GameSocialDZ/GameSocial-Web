import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {getUserOnce, addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing, getUser
} from "../../actions/action.user";
import {getOtherUserOnce} from "../../actions/action.otherUser";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.user.data.following
    }
  }

  // redux Action displays otherUser get success but not user get success on Unfollow or follow.
  // I think auth is transitioning causing the getUser function on the profile page to skip

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.user.data.following !== this.state.following) {
  //     this.setState({
  //       following: nextProps.user.data.following
  //     })
  //   }
  // }

  // Not good practice to async or side effect call data from this function unless you set initial state
  // componentWillMount() {
  //   if(!_.isEmpty(this.props.auth.currentUser)) {
  //     this.props.getUser(this.props.auth.currentUser.uid)
  //   }
  // }


  /**Publisher each follower & following from user
   ** profile page and the owner of upload on view page.**/

  unFollow = () =>{
    console.log('click unfollow success');
    const {user, auth, publisher} = this.props;
    this.props.removeUserFollower(auth.currentUser.uid, publisher.id);
    this.props.removeUserFollowing(user.data.id, publisher.id);
    this.props.getUserOnce(this.props.auth.currentUser.uid)
  };

  Follow = () => {
    console.log('click follow success');
    const {user, auth, publisher} = this.props;
    this.props.addUserFollower(user.data, publisher.id);
    this.props.addUserFollowing(auth.currentUser.uid, publisher);
    this.props.getUserOnce(this.props.auth.currentUser.uid)
  };

  getOtherUserProfile = () => {
    console.log('click success');
    const {publisher} = this.props;
    this.props.getOtherUserOnce(publisher.id);
  };

  render() {
    const {publisher, auth, user} = this.props;
    return (
      <Card>
        <Card.Content>
          <Image
            style={{borderRadius: '2rem'}}
            floated='right' size='mini' src={publisher.avatar.url} />
          <Card.Header>
            {publisher.username}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {
              this.props.user.loading ? (
                <Button loading/>
                ):(
                  <div>
                    {
                      !_.isEmpty(auth.currentUser) &&
                      <div>
                        {
                          this.props.user.data.following[publisher.id] ? (
                            <Button
                              onClick={this.unFollow}
                              basic color='green'>Unfollow</Button>
                          ):(
                            <Button
                              onClick={this.Follow}
                              basic color='green'>Follow</Button>
                          )
                        }
                        </div>
                    }
                    </div>
              )
            }
            <Button
              onClick={this.getOtherUserProfile}
              basic color='blue'><Link to='/profile'>Profile</Link></Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,
  {deleteUpload, getUserOnce, getUser, addUserFollowing, addUserFollower,
  removeUserFollowing, removeUserFollower, getOtherUserOnce})
(UserCard);