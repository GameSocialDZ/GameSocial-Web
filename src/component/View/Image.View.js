import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Grid, Button, Segment} from 'semantic-ui-react';

import UserCard from '../Card/User.Card';

import {deleteUpload} from "../../actions/action.upload";

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {image, user} = this.props;
    return (
      <div>
        <Grid stackable>
          <Grid.Row className="row">
            <Grid.Column width={12}>
              <Image
                alt="selected"
                src={image.url}/>
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
              <h1>{image.content.title}</h1>
              <p>{image.content.caption}</p>
              <span>Tags</span><span style={{float: 'right'}}>{image.content.createdAt}</span>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <UserCard
                publisher={image.publisher}/>
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

export default connect(null, {deleteUpload})(ImageView);