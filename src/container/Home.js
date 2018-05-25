import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Grid} from 'semantic-ui-react';

import {getUploads} from "../actions/action.upload";

import ImageCard from '../component/Image.Card';
import VideoCard from '../component/Video.Card';
import HomeHero from '../component/Home.Hero';

//import {createLoadingSelector} from '../selectors/select.loading';

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
      return (
        <Grid.Column key={image.id}>
          <ImageCard
            image={image}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  renderVideoUploads(videos) {
    return _.map(videos, (video) => {
      return (
        <Grid.Column key={video.id}>
          <VideoCard
            video={video}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  render() {
    const {videos, images, uploads} = this.props;

    if(uploads.loading){
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <HomeHero/>
        <Grid stackable columns={3} divided>
          <Grid.Row>
            {this.renderImageUploads(images)}
          </Grid.Row>
        </Grid>
        <Grid stackable columns={3} divided>
          <Grid.Row>
            {this.renderVideoUploads(videos)}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

//TODO: Get loading selector working
//const loadingSelector = createLoadingSelector(['UPLOADS']);

const mapStateToProps = state => ({
  uploads: state.uploads,
  images: state.uploads.data.images,
  videos: state.uploads.data.videos,
  auth: state.auth
  //loading: loadingSelector(state)
});

export default connect(mapStateToProps,
  {getUploads})(Home);