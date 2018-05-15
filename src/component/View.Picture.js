import React, { Component } from 'react';
import {connect} from 'react-redux';
//import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";

class PictureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const pictureId = this.key;
    const pictureUrl = this.props.pictureUrl;
    return (
      <div key={pictureId}>
        <div className="embed-responsive embed-responsive-16by9">
          <img
            className="embed-responsive-item"
            src={pictureUrl} //this.props.pictures[pictureId].source.url
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pictures: state.user.data.pictures
});

export default connect(mapStateToProps, {deleteUpload})(PictureView);