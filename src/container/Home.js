import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Grid, Segment, Container} from 'semantic-ui-react';

import {getUploads} from "../actions/action.upload";
import {getUserOnce, getUser} from '../actions/action.user';

import ContentSlider from '../component/Slider/Content.Slider';
import ImageCard from '../component/Card/Image.Card';
import VideoCard from '../component/Card/Video.Card';
import HomeHero from '../component/Home.Hero';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    this.props.getUploads();
  }

  renderImageUploads(images) {
    return _.map(images, (image) => {
      if (image.id === 'default') {
        return null;
      }
      return  _.size(this.props.images) < 4 ?
        (
          <Grid.Column
            key={image.id}>
            <ImageCard
              image={image}
              history={this.props.history}/>
          </Grid.Column>
        ):(
          <div
            key={image.id}>
            <ImageCard
              image={image}
              history={this.props.history}/>
          </div>
        )
    });
  }

  renderVideoUploads(videos) {
    return _.map(videos, (video) => {
      if (video.id === 'default') {
        return null;
      }
      return _.size(this.props.videos) < 4 ?
      (
        <Grid.Column
          key={video.id}>
            <VideoCard
              video={video}
              history={this.props.history}/>
          </Grid.Column>
        ):(
          <div
            key={video.id}>
            <VideoCard
              video={video}
              history={this.props.history}/>
          </div>
        )
    });
  }

  render() {
    const {videos, images, uploads} = this.props;
    if (this.props.uploads.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        <HomeHero/>
        <Container
          style={{marginBottom: '1rem'}}>
          {
            _.size(this.props.images) > 3 &&
            <ContentSlider
              content={this.renderImageUploads(images)}>
            </ContentSlider>
          }
          {
            _.size(this.props.images) <= 3 &&
            <Grid stackable columns={3}>
              <Grid.Row>
              {this.renderImageUploads(images)}
              </Grid.Row>
            </Grid>
          }
        </Container>
        <Container>
          {
            _.size(this.props.videos) > 3 &&
            <ContentSlider
              content={this.renderVideoUploads(videos)}>
            </ContentSlider>
          }
          {
            _.size(this.props.videos) <= 3 &&
            <Grid stackable columns={3}>
              <Grid.Row>
              {this.renderVideoUploads(videos)}
              </Grid.Row>
            </Grid>
          }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uploads: state.uploads,
  images: state.uploads.data.images,
  videos: state.uploads.data.videos,
  auth: state.auth
});

export default connect(mapStateToProps,
  {getUploads, getUser, getUserOnce})(Home);