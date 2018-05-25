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
        <Grid className="container-fluid">
          <Grid.Row className="row">
            <Grid.Column width={12} className="ui-media col-md-8 border rounded embed-responsive embed-responsive-16by9">
              <Player
                className="embed-responsive-item"
                loop
                playsinline
                aspectRatio="16:9"
                poster={video.thumbnail.large}
                src={video.url}/>
            </Grid.Column>
            <Grid.Cloumn width={4} className="col-md-4 border rounded">
              <p>Likes</p>
              <p>Views</p>
              <Button>Favorite</Button>
            </Grid.Cloumn>
          </Grid.Row>
        </Grid>
        <Grid className="container">
          <Grid.Row className="row justify-content-around">
            <Grid.Column width={10} className="col-sm-8 border rounded">
              <h1>Title</h1>
              <p>Caption</p>
              <span>tage</span><span style={{float: 'right'}}>Time Stamp</span>
            </Grid.Column>
            <Grid.Column width={6} className="col-sm-4 border rounded">
              <h1>Publisher</h1>
              <button className="btn btn-sm btn-outline-secondary">Follow</button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="row">
            <Grid.Column width={16} className="col-sm-12 border rounded">
              <h1>Comments</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(VideoView);