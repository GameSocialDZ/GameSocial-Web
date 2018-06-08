import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";
import {deleteView, getViewPromise} from "../actions/action.view";
import {getUserPromise} from '../actions/action.user';

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      view: null,
      follow: null,
      loadingView: false,
      initState: true
    }
  }

  // Set the initial state
  componentWillMount() {
    this.setState({
      loadingView: true
    })
  }

  // Handles Refresh
  componentDidMount() {
    const {match: {params}} = this.props;
    // Get upload state
    // then =>
    // Get the publisher state
    // then =>
    // Get the follow state
    this.props.getViewPromise(params.uploadId, params.type + 's').then((view) => {
      console.log(view);
      this.setState({
        view: this.props.view.data,
        loadingView: false,
        initState: true
      })
    }).then(() => {
      this.props.getUserPromise(params.userId).then((user) => {
        console.log(user);
        this.setState({
          user: this.props.user.data,
          loadingView: false,
          initState: true
        })
      });
    });
  }

  render() {
    const {view, user} = this.props;

    if (this.state.loadingView) {
      return <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    }

    return (
      <div style={{marginTop: '5rem'}}>
        {view.data.config.type === 'image' ? (
          <div className="">
            <ImageView
              user={user}
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              user={user}
              video={view.data}/>
          </div>)
        }
      </div>
    );
  }
}

//TODO: Get loading selector working

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  view: state.view,
});

export default connect(mapStateToProps,
  {deleteView, getViewPromise, getUserPromise})(View);