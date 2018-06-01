import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {deleteUpload} from "../actions/action.upload";
import {deleteView} from "../actions/action.view";
import {getUser} from '../actions/action.user';
import {getOtherUser} from "../actions/action.otherUser";

import ImageView from '../component/View/Image.View';
import VideoView from '../component/View/Video.View';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      otherUser: [],
      view: []
    }
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      otherUser: this.props.otherUser,
      view: this.props.view
    })
  }

  componentDidMount() {
    this.props.getOtherUser(this.state.view.data.publisher.id);
    if(!_.isEmpty(this.props.user.data)) {
      this.props.getUser(this.state.user.data.id);
    }
  }

  componentWillUnmount() {
    this.props.deleteView();
  }

  render() {
    const {view, user, otherUser} = this.props;
    const {history} = this.props;

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
              otherUser={otherUser.data}
              user={user}
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              otherUser={otherUser.data}
              // user={user}
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
  otherUser: state.user2
});

export default connect(mapStateToProps,
  {getUser, deleteUpload, deleteView, getOtherUser})(View);