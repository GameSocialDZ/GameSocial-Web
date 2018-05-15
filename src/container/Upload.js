import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import SimpleBox from "../component/SimpleBox";
import FormUpload from "../component/Form.Upload";

class Upload extends Component {
  // componentDidMount() {
  //   this.props.getUser();
  // }

  renderUploadForm() {
    return(
      <FormUpload/>
    );
  }

  renderUploadFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
    if(this.props.auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(this.props.auth.currentUser) || this.props.auth.error){
      return <Redirect to="/" />
    }
    return (
      <div>
        <SimpleBox
          title="Upload"
          body={this.renderUploadForm()}
          footer={this.renderUploadFooter()}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Upload);