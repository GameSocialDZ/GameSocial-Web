import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";
import {getFollowingPromise, getFollowing} from '../../actions/action.following';
import {getFollowersPromise, getFollowers} from '../../actions/action.followers';
import {addUserFollower, addUserFollowing,
  removeUserFollower, removeUserFollowing,
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
  componentWillUnmount() {
    const {auth, getFollowingPromise, getFollowersPromise} = this.props;

    // if(!_.isEmpty(auth.currentUser)) {
    //   getFollowingPromise(auth.currentUser.uid).then((following) => {
    //     console.log(following);
    //     this.setState({
    //       following: this.props.following,
    //       loadingFollowing: false,
    //       initState: true,
    //     })
    //   }).then(() => {
    //     getFollowersPromise(auth.currentUser.uid).then((followers) => {
    //       console.log(followers);
    //       this.setState({
    //         followers: this.props.followers,
    //         loadingFollowers: false,
    //         initState: true,
    //       })
    //     });
    //   })
    // }
  }

  // Update this components state with the new auth user's followers
  // componentWillReceiveProps(nextProps) {
  //   if(!_.isEmpty(nextProps.auth.currentUser)) {
  //     if (nextProps.following.data !== this.state.following.data) {
  //       this.setState({
  //         following: nextProps.following
  //       })
  //     }
  //     if (nextProps.followers.data !== this.state.followers.data) {
  //       this.setState({
  //         followers: nextProps.followers
  //       })
  //     }
  //   }
  // }

  componentDidMount() {

  }

  /**Publisher each follower & following from user
   ** profile page and the owner of upload on view page.**/

  unFollow = () =>{
    console.log('click unfollow success');
    const {auth, publisher} = this.props;
    this.props.removeUserFollower(auth.currentUser.uid, publisher.id);
    this.props.removeUserFollowing(auth.currentUser.uid, publisher.id);
  };

  Follow = () => {
    console.log('click follow success');
    const {auth, publisher} = this.props;
    this.props.addUserFollower(auth.currentUser, publisher.id);
    this.props.addUserFollowing(auth.currentUser.uid, publisher);
  };

  render() {
    const {publisher, auth, following, user} = this.props;
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
                      !_.isEmpty(auth.currentUser) && publisher.id !== this.props.auth.currentUser.uid &&
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
  {deleteUpload, addUserFollowing, addUserFollower,
    removeUserFollowing, removeUserFollower,
    getFollowersPromise, getFollowingPromise,
    getFollowers, getFollowing})
(UserCard);