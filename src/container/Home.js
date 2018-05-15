import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getUploads, deleteUpload} from "../actions/action.upload";

import {createLoadingSelector} from '../selectors/select.loading';

import CardHome from '../component/Card.Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getUploads();
  }

  renderPosts(uploads) {
    return _.map(uploads.data, (upload) => {
      return (
        <CardHome
          key={upload.id}
          upload={upload} />
      )
    });
  }

  render() {
    if(this.props.uploads.loading && !this.props.uploads.length) {
      return <h1>Loading...</h1>
    }

    const {uploads} = this.props;

    return (
      <div className="album py5 bg-light">
        <div className="container">
          <div className="row">
            {this.renderPosts(uploads)}
          </div>
        </div>
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