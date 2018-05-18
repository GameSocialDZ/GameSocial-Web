import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Player } from 'video-react';
//import _ from 'lodash';

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
      <div className="">
        <div className="embed-responsive embed-responsive-16by9">
          <Player
            className="embed-responsive-item"
            loop
            playsinline
            aspectRatio="16:9"
            poster={video.thumbnail.large}
            src={video.url}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(VideoView);