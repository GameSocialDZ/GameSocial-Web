import React, { Component } from 'react';
import {connect} from 'react-redux';
//import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";

class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {image} = this.props;
    return (
      <div key={image.id}>
        <div className="embed-responsive embed-responsive-16by9">
          <img
            alt="selected"
            className="embed-responsive-item"
            src={image.url} //this.props.pictures[pictureId].source.url
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(ImageView);