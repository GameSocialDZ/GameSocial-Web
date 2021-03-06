import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Grid, Image, Button, Segment} from 'semantic-ui-react';

import ModalEditProfile from '../Modal/Modal.EditProfile';
import ModalLinkAccounts from '../Modal/Modal.LinkAccounts';
import FollowToggle from '../Toggle/Toggle.Follow';

import {addFollowers, removeFollowers} from "../../actions/action.followers";
import {addFollowing,removeFollowing} from "../../actions/action.following";
import {getUserOnce} from "../../actions/action.user";

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {user, auth} = this.props;
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
                      <FollowToggle
                        publisher={user.data.profile}/>
                    </div>
                  ):(
                    <div>
                    {
                      !_.isEmpty(auth.currentUser) &&
                      <Button.Group>
                        <ModalLinkAccounts/>
                        <Button.Or />
                        <ModalEditProfile/>
                      </Button.Group>
                    }
                    </div>
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
  {addFollowing,removeFollowing,addFollowers,removeFollowers, getUserOnce})
(ProfileCard);