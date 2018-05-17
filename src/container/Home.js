import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getUploads, deleteUpload} from "../actions/action.upload";

import {createLoadingSelector} from '../selectors/select.loading';

import ImageCard from '../component/Image.Card';
import VideoCard from '../component/Video.Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getUploads();
  }

  renderImageUploads(images) {
    return _.map(images, (image) => {
      return (
        <ImageCard
          key={image.id}
          image={image}
          history={this.props.history}/>
      )
    });
  }

  renderVideoUploads(videos) {
    return _.map(videos, (video) => {
      return (
        <VideoCard
          key={video.id}
          video={video}
          history={this.props.history}/>
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
        <div className="album py5 bg-light">
          <div className="container">
            <div className="row">
              {this.renderImageUploads(images)}
            </div>
          </div>
        </div>
        <div className="album py5 bg-light">
          <div className="container">
            <div className="row">
              {this.renderVideoUploads(videos)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Get loading selector working
const loadingSelector = createLoadingSelector(['UPLOADS']);

const mapStateToProps = state => ({
  uploads: state.uploads,
  images: state.uploads.data.images,
  videos: state.uploads.data.videos,
  auth: state.auth,
  loading: loadingSelector(state)
});

export default connect(mapStateToProps, {getUploads, deleteUpload})(Home);