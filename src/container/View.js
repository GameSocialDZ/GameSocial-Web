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
      view: [],
      user: [],
      // otherUser: []
    }
  }

  /*** I have commented out otherUser for view page as I am unsure if I will use
   * this is also commented out on ProfileDetails and UserCard***/

  // Set the initial state
  componentWillMount() {
    this.setState({
      user: this.props.user,
      view: this.props.view,
      // otherUser: this.props.otherUser
    })
  }

  componentDidMount() {
    // Get the otherUser on view page for faster transition to potential otherUser profile page
    this.props.getOtherUser(this.state.view.data.publisher.id);
    // Get and listen for User data if logged in (This also updates user following for User.Card)
    if(!_.isEmpty(this.props.user.data)) {
      this.props.getUser(this.state.user.data.id);
    }
  }

  // Clear Redux state when component unmounts
  componentWillUnmount() {
    this.props.deleteView();
  }

  render() {
    const {view, user, otherUser} = this.props;
    const {history} = this.props;

    if (view.loading) {
      return <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    }
    else if (_.isEmpty(view.data)){
      return history.goBack();
    }
    return (
      <div style={{marginTop: '5rem'}}>
        {view.data.config.type === 'image' ? (
          <div className="">
            <ImageView
              // otherUser={otherUser.data}
              user={user}
              image={view.data}/>
          </div>
        ):(
          <div className="">
            <VideoView
              // otherUser={otherUser.data}
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
  // otherUser: state.user2
});

export default connect(mapStateToProps,
  {getUser, deleteUpload, deleteView, getOtherUser})(View);