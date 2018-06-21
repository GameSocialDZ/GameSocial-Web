import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Player } from 'video-react';
import _ from 'lodash';

import {Grid, Button, Segment} from 'semantic-ui-react';

import {deleteUpload} from "../../actions/action.upload";

import Comments from '../Card/Comment.Card';
import UserCard from '../Card/User.Card';
import ViewsCount from '../Count/Count.Views';
import FavoriteToggle from '../Toggle/Toggle.Favorite';

class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {view} = this.props;
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
                poster={view.data.thumbnail.large}
                src={view.data.url}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
              <p>Likes</p>
              <ViewsCount
                uploadId={view.data.id}
                type={view.data.config.type}/>
                <FavoriteToggle
                  upload={view.data}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment>
              <h1>{view.data.content.title}</h1>
              <p>{view.data.content.caption}</p>
              <span>Tags</span><span style={{float: 'right'}}>{view.data.content.createdAt}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <UserCard
                page={this.props.page}
                publisher={view.data.publisher}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
              <Comments/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view
});

export default connect(mapStateToProps, {deleteUpload})(VideoView);