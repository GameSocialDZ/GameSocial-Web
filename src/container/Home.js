import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getPosts, deletePost} from "../actions/postActions";

import Card from '../component/Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, (post, key) => {
      return (
        <Card key={key}>
          <h3>{post.name}</h3>
          <p>{post.message}</p>
          <button
            className="btn btn-danger btn-xs"
            onClick={()=>this.props.deletePost(key)}>Delete</button>
        </Card>
      )
    });
  }

  render() {
    return (
      <div className="App">
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.data
});

export default connect(mapStateToProps, {getPosts, deletePost})(Home);