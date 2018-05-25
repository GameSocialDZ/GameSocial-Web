import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalPopup from "./Modal.Popup";

import {Grid, Image, Button, Segment} from 'semantic-ui-react';

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
                <Button
                  type="button"
                  onClick={this.openLinkModal}>Link</Button>
                <Button
                  type="button"
                  onClick={this.openEditModal}>Edit</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column>
              <Segment><span>Points</span></Segment>
              <Segment><span>Followers</span></Segment>
              <Segment><span>Following</span></Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ModalPopup
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