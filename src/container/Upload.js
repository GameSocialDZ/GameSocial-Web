import React, {Component} from 'react';
import SimpleBox from "../component/SimpleBox";
import Form from "../component/Form";

export default class Upload extends Component {
  renderUploadForm() {
    return(
      <Form/>
    );
  }

  renderUploadFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
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