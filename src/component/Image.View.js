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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="ui-media col-md-10 border rounded embed-responsive embed-responsive-16by9 m-auto">
              <img
                alt="selected"
                className="embed-responsive-item"
                src={image.url}/>
            </div>
            <div className="col-md-2 border rounded">
              <p>Likes</p>
              <button>Favorite</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-sm-8 border rounded">
              <h1>Title</h1>
              <p>Caption</p>
              <span>Time Stamp</span>
            </div>
            <div className="col-sm-4 border rounded">
              <h1>Publisher</h1>
              <button className="btn btn-sm btn-outline-secondary">Follow</button>
            </div>
          </div>
          <div className="row justify-content-around">
            <div className="col-sm-12 border rounded">
              <h1>Comments</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {deleteUpload})(ImageView);