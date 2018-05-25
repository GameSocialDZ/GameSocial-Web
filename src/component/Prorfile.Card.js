import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Grid, Image, Button, Segment} from 'semantic-ui-react';

import ModalEditProfile from './Modal.EditProfile';
import ModalLinkAccounts from './Modal.LinkAccounts';

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {profile} = this.props;
    return (
      <div>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column>
              <Image
                src={profile.avatar.url}
                alt="Placeholder"/>
            </Grid.Column>
            <Grid.Column>
              <p>{profile.name}</p>
              <p>@{profile.username}</p>
              <p>{profile.bio}</p>
              <div>
                <a type='email'>{profile.email}</a>
              </div>
              <Button.Group>
                <ModalLinkAccounts/>
                <ModalEditProfile/>
              </Button.Group>
            </Grid.Column>
            <Grid.Column>
              <Segment><span>Points</span></Segment>
              <Segment><span>Followers</span></Segment>
              <Segment><span>Following</span></Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileCard);