import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Grid, Container} from 'semantic-ui-react';

import {getUploads} from "../actions/action.upload";

import ContentSlider from '../component/Slider/Content.Slider';
import ImageCard from '../component/Card/Image.Card';
import VideoCard from '../component/Card/Video.Card';
import HomeHero from '../component/Home.Hero';

//import {createLoadingSelector} from '../selectors/select.loading';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

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
        <div key={image.id}>
          <ImageCard
            image={image}
            history={this.props.history}/>
        </div>
      )
    });
  }

  renderVideoUploads(videos) {
    return _.map(videos, (video) => {
      return (
        <div key={video.id}>
          <VideoCard
            video={video}
            history={this.props.history}/>
        </div>
      )
    });
  }

  render() {


    const {videos, images, uploads} = this.props;

    if(uploads.loading){
      return <h1>Loading...</h1>
    }

    return (
      <div style={{marginTop: '68.5px'}}>
        <HomeHero/>
        <Container>
          <ContentSlider
            content={this.renderImageUploads(images)}>
          </ContentSlider>
        </Container>
        <Container>
          <ContentSlider
            content={this.renderVideoUploads(videos)}>
          </ContentSlider>
        </Container>
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