import React, { Component } from 'react';
import {connect} from 'react-redux';
//import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";
import {deleteView} from "../actions/action.view";

import ImageView from '../component/Image.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillUnmount() {
    this.props.deleteView();
  }

  render() {
    if (this.props.view.loading) {
      return <h1>Loading...</h1>
    }
    else if (_.isEmpty(this.props.view.data)){
      return this.props.history.goBack();
    }
    return (
      <div className="">
        <ImageView
          picture={this.props.view.data}/>
      </div>
    );
  }
}

//TODO: Get loading selector working

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
});

export default connect(mapStateToProps, {deleteUpload, deleteView})(View);