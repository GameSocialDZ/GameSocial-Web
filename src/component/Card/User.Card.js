import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {getUserOnce, addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing, getUser
} from "../../actions/action.user";
import {getOtherUser} from "../../actions/action.otherUser";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  unFollow = () => {
    console.log('click success');
    const {auth, publisher} = this.props;
    this.props.removeUserFollower(auth.uid, publisher.id);
    this.props.removeUserFollowing(auth.uid, publisher.id);
  };

  Follow = () => {
    console.log('click success');
    const {publisher, auth} = this.props;
    this.props.addUserFollower(auth, publisher.id);
    this.props.addUserFollowing(auth.uid, publisher);
  };

  getOtherUserProfile = () => {
    console.log('click success');
    const {publisher, getOtherUser} = this.props;
    getOtherUser(publisher.id);
  };

  render() {
    const {publisher, auth, user, authLoading} = this.props;
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
              authLoading ? (<Button loading/>):(
                <div>
                  {
                    !_.isEmpty(auth) &&
                    <div>
                      {
                        user.following[publisher.id] ? (
                          <Button
                            onClick={this.unFollow}
                            basic color='green'>Unfollow</Button>
                        ) : (
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
  view: state.view.data,
  user: state.user.data,
  authLoading: state.auth.loading,
  auth: state.auth.currentUser,
});

export default connect(mapStateToProps,
  {deleteUpload, getUserOnce, getUser, addUserFollowing, addUserFollower,
  removeUserFollowing, removeUserFollower, getOtherUser})
(UserCard);