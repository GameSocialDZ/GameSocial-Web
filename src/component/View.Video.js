import React, { Component } from 'react';
import {connect} from 'react-redux';
//import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";

class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const videoId = this.props.videoId;
    return (
      <div className="">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={this.props.videos[videoId].source.url}
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  videos: state.user.data.videos
});

export default connect(mapStateToProps, {deleteUpload})(VideoView);