import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalView from "./Profile.Modal";

import {Grid, Image, Button} from 'semantic-ui-react';

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalType: null
    }
  }

  openLinkModal = () => {
    this.setState({modalIsOpen: true});
    this.setState({modalType: 'link'});
  };
  openEditModal = () => {
    this.setState({modalIsOpen: true});
    this.setState({modalType: 'edit'});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };


  render() {
    const {profile} = this.props;
    const {modalType, modalIsOpen} = this.state;
    return (
      <div>
      <Grid celled='internally'>
        <Grid.Row >
          <Grid.Column width={11}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Image
                    style={{width: '250px'}}
                    src={profile.avatar.url}
                    alt="Placeholder"/>
                </Grid.Column>
                <Grid.Column width={10}>
                  <p className="title is-4">{profile.name}</p>
                  <p className="subtitle is-6">@{profile.username}</p>
                  <p className="text">{profile.bio}</p>
                  <div>
                    <a type='email'>{profile.email}</a>
                  </div>
                    <Button.Group>
                      <Button
                        type="button"
                        onClick={this.openLinkModal}>Link</Button>
                      <Button
                        type="button"
                        onClick={this.openEditModal}>Edit</Button>
                    </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid>
              <Grid.Row className="row">
                <Grid.Column>Points</Grid.Column>
                <Grid.Column>Followers</Grid.Column>
                <Grid.Colmun>Following</Grid.Colmun>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        </Grid.Row>
      </Grid>
        <ModalView
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
          modalType={modalType}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileCard);