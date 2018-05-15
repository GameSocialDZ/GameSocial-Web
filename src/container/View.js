import React, { Component } from 'react';
import {connect} from 'react-redux';
//import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";

import PictureView from '../component/View.Picture';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="">
        <PictureView
          key={this.props.view.data.id}
          pictureUrl={this.props.view.data.url}/>
      </div>
    );
  }
}

//TODO: Get loading selector working

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
});

export default connect(mapStateToProps, {deleteUpload})(View);