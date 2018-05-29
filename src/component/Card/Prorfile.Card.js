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
    const {user} = this.props;
    const profile = user.profile;
    return (
      <div>
        <Grid columns={3} stackable padded>
          <Grid.Row>
            <Grid.Column style={{width: '250px', height: '250px'}}>
              <Segment textAlign={'center'}>
              <Image
                style={{borderRadius: '9rem', width: '200px', height: '200px', display: 'inline-block'}}
                src={profile.avatar.url}
                alt="Placeholder"/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
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
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Segment><span>Points: {user.points}</span></Segment>
                <Segment><span>Followers:</span></Segment>
                <Segment><span>Following:</span></Segment>
              </Segment>
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