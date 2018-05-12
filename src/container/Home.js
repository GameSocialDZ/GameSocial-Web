import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getUploads, deleteUpload} from "../actions/action.upload";

import Card from '../component/Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.getUploads();
  }

  deleteUpload(key) {
    this.props.deleteUpload(key);
    this.props.getUploads();
  }

  renderPosts() {
    return _.map(this.props.uploads, (post, key) => {
      return (
        <Card key={key}>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          {
            _.isEmpty(this.props.auth) ? (
              <span/>
            ):(
              <button
                className="btn btn-danger btn-xs"
                onClick={()=>this.deleteUpload()}>Delete</button>
            )
          }
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
  uploads: state.uploads.data,
  auth: state.auth.data
});

export default connect(mapStateToProps, {getUploads, deleteUpload})(Home);