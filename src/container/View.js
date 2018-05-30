import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";
import {deleteView} from "../actions/action.view";
import {getUser} from '../actions/action.user';

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    if (!_.isEmpty(this.props.auth)) {
      this.props.getUser(this.props.auth.uid)
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
      <div style={{marginTop: '5rem'}}>
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
  auth: state.auth.currentUser,
  view: state.view
});

export default connect(mapStateToProps,
  {getUser, deleteUpload, deleteView})(View);