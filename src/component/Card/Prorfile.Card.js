import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Grid, Image, Button, Segment} from 'semantic-ui-react';

import ModalEditProfile from '../Modal/Modal.EditProfile';
import ModalLinkAccounts from '../Modal/Modal.LinkAccounts';

import {addFollowers, removeFollowers} from "../../actions/action.followers";
import {addFollowing,removeFollowing} from "../../actions/action.following";

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  unFollow = () => {
    console.log('click unfollow success');
    const {auth, user} = this.props;
    this.props.removeFollowers(auth.currentUser.uid, user.data.id);
    this.props.removeFollowing(auth.currentUser.uid, user.data.id);
  };

  Follow = () => {
    console.log('click follow success');
    const {auth, user} = this.props;
    this.props.addFollowers(auth.currentUser, user.data.id);
    this.props.addFollowing(auth.currentUser.uid, user.data.profile);
  };

  render() {
    const {user, auth, following} = this.props;
    return (
      <div>
        <Grid columns={3} stackable padded>
          <Grid.Row>
            <Grid.Column style={{width: '250px', height: '250px'}}>
              <Segment textAlign={'center'}>
              <Image
                style={{borderRadius: '9rem', width: '200px', height: '200px', display: 'inline-block'}}
                src={user.data.profile.avatar.url}
                alt="Placeholder"/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Segment>
                  <p>{user.data.profile.name}</p>
                  <p>@{user.data.profile.username}</p>
                  <p>{user.data.profile.bio}</p>
                  <div>
                    <a type='email'>{user.data.profile.email}</a>
                  </div>
                </Segment>
                {
                  !_.isEmpty(auth.currentUser) && (user.data.id !== auth.currentUser.uid) ? (
                    <div>
                      {
                        // Check auth user's following list to render unfollow or follow button
                        following.data[user.data.id] ? (
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
                  ):(
                    <Button.Group>
                      <ModalLinkAccounts/>
                      <ModalEditProfile/>
                    </Button.Group>
                  )
                }
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Segment><span>Points: {user.data.points}</span></Segment>
                <Segment><span>Followers: {_.size(user.data.followers)-1}</span></Segment>
                <Segment><span>Following: {_.size(user.data.following)-1}</span></Segment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  following: state.following,
  user: state.user
});

export default connect(mapStateToProps,
  {addFollowing,removeFollowing,addFollowers,removeFollowers})
(ProfileCard);