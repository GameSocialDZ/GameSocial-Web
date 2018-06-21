import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Image, Card, Button} from 'semantic-ui-react';

import FollowButton from '../follow/Follow.Btn';

import {deleteUpload} from "../../actions/action.upload";
import {addFollowers, removeFollowers} from "../../actions/action.followers";
import {addFollowing,removeFollowing} from "../../actions/action.following";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null
    }
  }

  render() {
    const {publisher, auth, following, page} = this.props;
    return (
      <Card>
        <Card.Content>
          <Image
            style={{borderRadius: '.25rem'}}
            floated='right' size='mini' src={publisher.avatar.url} />
          <Card.Header>
            {publisher.username}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <FollowButton
              page={page}
              publisher={publisher}/>
            <Button
              basic color='blue'><Link to={`/profile/${publisher.id}`}>Profile</Link></Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  followers: state.followers,
  following: state.following
});

export default connect(mapStateToProps,
  {deleteUpload, addFollowing, addFollowers,
    removeFollowing, removeFollowers})
(UserCard);