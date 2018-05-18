import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";
import {deleteView} from "../actions/action.view";

import ImageView from '../component/Image.View';
import VideoView from '../component/Video.View';

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
    const {view, history} = this.props;

    if (view.loading) {
      return <h1>Loading...</h1>
    }
    else if (_.isEmpty(view.data)){
      return history.goBack();
    }
    return (
      <div>
        {view.data.config.type === 'image' ? (
          <div className="">
            <ImageView
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              video={view.data}/>
          </div>)
        }
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