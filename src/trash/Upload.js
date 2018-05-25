import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import CommonBox from "./Common.Box";
import FormUpload from "../component/Form.Upload";

class Upload extends Component {
  renderUploadForm() {
    return(
      <FormUpload/>
    );
  }

  render() {
    const {currentUser, auth} = this.props;

    if (auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(currentUser) || auth.error){
      return <Redirect to="/" />
    }

    return (
      <div>
        <CommonBox
          title="Upload"
          body={this.renderUploadForm()}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Upload);