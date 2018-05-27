import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Grid, Image, Button, Segment} from 'semantic-ui-react';

import ModalEditProfile from '../Modal/Modal.EditProfile';
import ModalLinkAccounts from '../Modal/Modal.LinkAccounts';

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
        <Grid columns={3} stackable padded>
          <Grid.Row>
            <Grid.Column style={{width: '250px', height: '250px'}}>
              <Image
                style={{borderRadius: '9rem', width: '200px', height: '200px'}}
                src={profile.avatar.url}
                alt="Placeholder"/>
            </Grid.Column>
            <Grid.Column>
              <Segment>
              <p>{profile.name}</p>
              <p>@{profile.username}</p>
              <p>{profile.bio}</p>
              <div>
                <a type='email'>{profile.email}</a>
              </div>
              </Segment>
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