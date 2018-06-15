import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {addFollowers, removeFollowers} from "../../actions/action.followers";
import {addFollowing,removeFollowing} from "../../actions/action.following";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null
    }
  }

  unFollow = () =>{
    console.log('click unfollow success');
    const {auth, publisher} = this.props;
    this.props.removeFollowers(auth.currentUser.uid, publisher.id);
    this.props.removeFollowing(auth.currentUser.uid, publisher.id);
  };

  Follow = () => {
    console.log('click follow success');
    const {auth, publisher} = this.props;
    this.props.addFollowers(auth.currentUser, publisher.id);
    this.props.addFollowing(auth.currentUser.uid, publisher);
  };

  render() {
    const {publisher, auth, following, page} = this.props;
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
              // If followers is updating return loading button
              following.loading ? (
                <Button loading/>
                ):(
                  <div>
                    {
                      // if unAuthorized (not logged in) don't show follow or unfollow button
                      (!_.isEmpty(auth.currentUser) && page !== 'profile' && (publisher.id !== this.props.auth.currentUser.uid)) &&
                      <div>
                        {
                          // Check auth user's following list to render unfollow or follow button
                          following.data[publisher.id] ? (
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
              basic color='blue'><Link to={`/profile/${publisher.id}`}>Profile</Link></Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  followers: state.followers,
  following: state.following
});

export default connect(mapStateToProps,
  {deleteUpload, addFollowing, addFollowers,
    removeFollowing, removeFollowers})
(UserCard);