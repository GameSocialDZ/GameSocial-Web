import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button, Icon} from 'semantic-ui-react';

import {removeLike, addLike, getLikesOnce} from "../../actions/action.likes";

//TODO: pass uploadId from this parent
class LikeToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likesList: null,
      isLiked: null
    }
  }

  unLike = () =>{
    console.log('click unfavorite success');
    const {auth, upload} = this.props;
    this.props.removeLike(auth.currentUser.uid, upload.id, upload.config.type);
    this.props.getLikesOnce(auth.currentUser.uid);
  };

  Like = () => {
    console.log('click favorite success');
    const {auth, upload} = this.props;
    this.props.addLike(auth.currentUser.uid, upload.id, upload.config.type);
    this.props.getLikesOnce(auth.currentUser.uid);
  };

  render() {
    const {upload, auth, likes} = this.props;
    return (
      <div>Likes: {_.size(upload.likes)}
        {
          // If followers is updating return loading button
          likes.loading ? (
            <Button loading/>
          ):(
            <div style={{float: 'right'}}>
              {
                // if unAuthorized (not logged in) don't show follow or unfollow button
                !_.isEmpty(auth.currentUser) &&
                <div>
                  {
                    _.isEmpty(likes.data) ? (
                      <Icon
                        size={'big'}
                        name={'fire'}
                        onClick={this.Like}/>
                    ):(
                      likes.data[upload.id] ? (
                        <Icon
                          size={'big'}
                          name={'gay'}
                          onClick={this.unLike}/>
                      ) : (
                        <Icon
                          size={'big'}
                          name={'fire'}
                          onClick={this.Like}/>
                      )
                    )
                  }
                </div>
              }
            </div>
          )
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  likes: state.likes
});

export default connect(mapStateToProps,
  {getLikesOnce, removeLike, addLike})
(LikeToggle);