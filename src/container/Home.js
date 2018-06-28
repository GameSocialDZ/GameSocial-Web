import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUploadsPromise} from "../actions/action.upload";
import {getFeaturedPromise} from "../actions/action.featured";
import {getAuth} from "../actions/action.auth";

import ContentSlider from '../component/Slider/Content.Slider';
import ImageCard from '../component/Card/Card.Image';
import VideoCard from '../component/Card/Card.Video';
import HomeHero from '../component/Home.Hero';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingUploads: true,
      loadingFeatured: true,
      initState: true
    }
  }

  componentWillReceiveProps(nextProps) {
    //Log in on Home page
    if(!_.isEmpty(nextProps.auth.currentUser) && _.isEmpty(this.props.auth.currentUser)) {
      this.props.getAuth();
    }
  }

  // Get the uploads for home page
  componentDidMount() {
    this.props.getUploadsPromise().then(() => {
      this.setState({
        loadingUploads: false,
        initState: true
      });
    });

    this.props.getFeaturedPromise().then(() => {
      this.setState({
        loadingFeatured: false,
        initState: true
      })
    });
  }

  // Set all uploads within components state
  componentWillMount() {
    this.setState({
      loadingUploads: true,
      initState: true
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
              page={'home'}/>
          </Grid.Column>
        ):(
          <div
            key={image.id}>
            <ImageCard
              image={image}
              page={'home'}/>
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
              page={'home'}/>
          </Grid.Column>
        ):(
          <div
            key={video.id}>
            <VideoCard
              video={video}
              page={'home'}/>
          </div>
        )
    });
  }

  render() {
    const {uploads} = this.props;

    if (this.state.loadingUploads) {
      return <h1 style={{marginTop: '4.5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '4.5rem', backgroundColor: 'dimgray'}}>
        <Header textAlign={'center'} size={'huge'}>Featured Videos</Header>
        <HomeHero/>
        <Header textAlign={'center'} size={'large'}>Images</Header>
        <Container style={{marginBottom: '1rem'}}>
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
        <Header textAlign={'center'} size={'large'}>Videos</Header>
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
  {getUploadsPromise, getFeaturedPromise, getAuth})
(Home);