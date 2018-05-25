import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Player } from 'video-react';
//import _ from 'lodash';

import {Grid, Button} from 'semantic-ui-react';

import {deleteUpload} from "../actions/action.upload";

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
              <p>Likes</p>
              <p>Views</p>
              <button>Favorite</button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1>Title</h1>
              <p>Caption</p>
              <span>Tags</span><span style={{float: 'right'}}>Time Stamp</span>
            </Grid.Column>
            <Grid.Column width={6}>
              <h1>Publisher</h1>
              <button>Follow</button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <h1>Comments</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(VideoView);