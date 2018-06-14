import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Player } from 'video-react';
import _ from 'lodash';

import {Grid, Button, Segment} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";

import UserCard from '../Card/User.Card';

class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {video} = this.props;
    return (
      <div>
        <Grid>
          <Grid.Row className="row">
            <Grid.Column width={12}>
              <Player
                className="embed-responsive-item"
                loop
                playsinline
                aspectRatio="16:9"
                poster={video.thumbnail.large}
                src={video.url}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
              <p>Likes</p>
              <p>Views</p>
              <Button>Favorite</Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment>
              <h1>{video.content.title}</h1>
              <p>{video.content.caption}</p>
              <span>Tags</span><span style={{float: 'right'}}>{video.content.createdAt}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <UserCard
                page={this.props.page}
                publisher={video.publisher}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
              <h1>Comments</h1>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(VideoView);