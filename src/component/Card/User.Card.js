import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {getUserOnce, addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing, getUser
} from "../../actions/action.user";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null
    }
  }

  //TODO:

  // set initial user following state if logged in
  componentWillMount() {
    if(!_.isEmpty(this.props.auth.currentUser))
    this.setState({
      following: this.props.user.data.following
    })
  }

  // Update this components state with the new auth user's followers
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.data.following !== this.state.following) {
      this.setState({
        following: nextProps.user.data.following
      })
    }
  }

  componentDidMount() {

  }

  /**Publisher each follower & following from user
   ** profile page and the owner of upload on view page.**/

  unFollow = () =>{
    console.log('click unfollow success');
    const {user, auth, publisher} = this.props;
    this.props.removeUserFollower(auth.currentUser.uid, publisher.id);
    this.props.removeUserFollowing(user.data.id, publisher.id);
  };

  Follow = () => {
    console.log('click follow success');
    const {user, auth, publisher} = this.props;
    this.props.addUserFollower(user.data, publisher.id);
    this.props.addUserFollowing(auth.currentUser.uid, publisher);
  };

  render() {
    const {publisher, auth, followers, following} = this.props;
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
              this.props.user.loading ? (
                <Button loading/>
                ):(
                  <div>
                    {
                      // if unAuthorized (not logged in) don't show follow or unfollow button
                      !_.isEmpty(auth.currentUser) && publisher.id !== this.props.auth.currentUser.uid &&
                      <div>
                        {
                          // Check auth user's following list to render unfollow or follow button
                          this.props.following[publisher.id] ? (
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
  auth: state.auth,
  followers: state.followers,
  following: state.following
});

export default connect(mapStateToProps,
  {deleteUpload, getUserOnce, getUser, addUserFollowing, addUserFollower,
  removeUserFollowing, removeUserFollower})
(UserCard);