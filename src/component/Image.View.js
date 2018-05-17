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
    const picture = this.props.picture;
    return (
      <div key={picture.id}>
        <div className="embed-responsive embed-responsive-16by9">
          <img
            alt="selected"
            className="embed-responsive-item"
            src={picture.source.url} //this.props.pictures[pictureId].source.url
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(ImageView);