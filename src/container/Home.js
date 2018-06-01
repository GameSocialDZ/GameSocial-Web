import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Grid, Segment, Container} from 'semantic-ui-react';

import {getUploads, getUploadsOnce} from "../actions/action.upload";
import {getUserOnce, getUser} from '../actions/action.user';

import ContentSlider from '../component/Slider/Content.Slider';
import ImageCard from '../component/Card/Image.Card';
import VideoCard from '../component/Card/Video.Card';
import HomeHero from '../component/Home.Hero';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: []
    }
  }

  // Get the uploads for home page
  componentDidMount() {
    this.props.getUploads();
  }

  // Set all uploads within components state
  componentWillMount() {
    this.setState({
      uploads: this.props.uploads
    })
  }

  renderImageUploads(images) {
    return _.map(images, (image) => {
      if (image.id === 'default') {
        return null;
      }
      return  _.size(images) < 4 ?
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
      return _.size(videos) < 4 ?
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
    const {uploads} = this.props;

    if (this.props.uploads.loading) {
      return <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        <HomeHero/>
        <Container
          style={{marginBottom: '1rem'}}>
          {
            _.size(uploads.data.images) > 3 &&
            <ContentSlider
              content={this.renderImageUploads(uploads.data.images)}>
            </ContentSlider>
          }
          {
            _.size(uploads.data.images) <= 3 &&
            <Grid stackable columns={3}>
              <Grid.Row>
              {this.renderImageUploads(uploads.data.images)}
              </Grid.Row>
            </Grid>
          }
        </Container>
        <Container>
          {
            _.size(uploads.data.videos) > 3 &&
            <ContentSlider
              content={this.renderVideoUploads(uploads.data.videos)}>
            </ContentSlider>
          }
          {
            _.size(uploads.data.videos) <= 3 &&
            <Grid stackable columns={3}>
              <Grid.Row>
              {this.renderVideoUploads(uploads.data.videos)}
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
  auth: state.auth
});

export default connect(mapStateToProps,
  {getUploads, getUser, getUserOnce, getUploadsOnce})(Home);