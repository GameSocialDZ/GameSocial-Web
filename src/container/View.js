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
      view: [],
      user: [],
    }
  }

  /*** I have commented out otherUser for view page as I am unsure if I will use
   * this is also commented out on ProfileDetails and UserCard***/

  // Set the initial state
  componentWillMount() {
    this.setState({
      user: this.props.user,
      view: this.props.view,
    })
  }

  componentDidMount() {
    // Get and listen for User data if logged in (This also updates user following for User.Card)
    if(!_.isEmpty(this.props.user.data)) {
      this.props.getUser(this.state.user.data.id);
    }
  }

  // Clear Redux state when component unmounts
  // componentWillUnmount() {
  //   this.props.deleteView();
  // }

  render() {
    const {view, user} = this.props;
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
  {getUser, deleteUpload, deleteView})(View);