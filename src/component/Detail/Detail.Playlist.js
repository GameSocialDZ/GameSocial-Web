import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Segment, Container} from 'semantic-ui-react';

import {getUser, getUserPromise} from "../../actions/action.user";
import {getAuth} from '../../actions/action.auth';

import PlaylistGroupCard from "../Card/Card.Playlist.Group";
import PlaylistCard from '../Card/Card.Playlist'
import PlaylistMenu from "../Menu/Menu.Playlist"

export class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'image',
    }
  }

  renderUserPlaylistGroup(playlistGroup) {
    return _.map(playlistGroup, (group) => {
      return (
        <Grid.Column key={group.id}>
          <PlaylistGroupCard
            group={group}
            page={this.props.page}
          />
        </Grid.Column>
      )
    });
  }

  renderUserPlaylist(playlist){
    return _.map(playlist, (video) => {
      if(video === playlist.name){return null}
      return (
        <Grid.Column
          mobile={16}
          computer={8}
          largeScreen={5}
          style={{marginBottom: '1rem'}} key={video.id}>
          <PlaylistCard
            video={video}
            page={this.props.page}
          />
        </Grid.Column>
      )
    });
  }

  getActiveMenu(state){
    this.setState({
      activeMenu: state
    })
  }

  render() {
    const {user} = this.props;
    const {activeMenu} = this.state;
    return (
      <div>
        <PlaylistMenu getActiveMenu={(state) => this.getActiveMenu(state)}/>
        {
          !_.isEmpty(user.data.playlist) && user.data.playlist[activeMenu] && (activeMenu === user.data.playlist[activeMenu].name) &&
            <Container>
              <Grid stackable>
                <Grid.Row>
                  {this.renderUserPlaylist(user.data.playlist[activeMenu])}
                </Grid.Row>
              </Grid>
            </Container>
        }
        {
          activeMenu === 'browse' &&
          <Container>
            <Grid stackable columns={2}>
              <Grid.Row>
                {/*{this.renderUserPlaylistGroup(user.data.playlist)}*/}
              </Grid.Row>
            </Grid>
          </Container>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps,
  {getAuth, getUser})(ProfileDetail);