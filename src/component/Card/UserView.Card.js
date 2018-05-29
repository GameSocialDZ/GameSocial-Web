import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {getUserOnce, addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing} from "../../actions/action.user";

class UserViewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  unFollow(publisherId, userId) {
    this.props.removeUserFollower(publisherId);
    this.props.removeUserFollowing(userId);
  }

  Follow(publisherId, userId) {
    this.props.addUserFollower(publisherId);
    this.props.addUserFollowing(userId);
  }

  getProfile(publisher) {

  }

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
                _.includes(user.following, publisher.id) ? (
              <Button
                onClick={this.unFollow(publisher.id, auth.uid)}
                basic color='green'>Unfollow</Button>
                ):(
              <Button
                onClick={this.Follow(publisher.id, auth.uid)}
                basic color='green'>Follow</Button>
              )
            }
            <Button
              onClick={this.getProfile(publisher.id)}
              basic color='blue'>Profile</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view.data,
  user: state.user.data,
  auth: state.auth.currentUser
});

export default connect(mapStateToProps,
  {deleteUpload, getUserOnce, addUserFollowing, addUserFollower,
  removeUserFollowing, removeUserFollower})(UserViewCard);