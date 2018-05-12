import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getUploads, deleteUpload} from "../actions/action.upload";

import {createLoadingSelector} from '../selectors/select.loading';

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

  renderPosts() {
    return _.map(this.props.uploads.data, (post, key) => {
      return (
        <Card key={key}>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          {
            _.isEmpty(this.props.auth.data) ? (
              null
              ):(
                <button
                className="btn btn-danger btn-xs"
                onClick={() => this.props.deleteUpload(key)}>Delete</button>
            )
          }
        </Card>
      )
    });
  }

  render() {
    if(this.props.uploads.loading && !this.props.uploads.length) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="App">
        {this.renderPosts()}
      </div>
    );
  }
}

//TODO: Get loading selector working
const loadingSelector = createLoadingSelector(['UPLOADS']);

const mapStateToProps = state => ({
  uploads: state.uploads,
  auth: state.auth,
  loading: loadingSelector(state)
});

export default connect(mapStateToProps, {getUploads, deleteUpload})(Home);