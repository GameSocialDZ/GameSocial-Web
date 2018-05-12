import React, {Component} from 'react';
import SimpleBox from "../component/SimpleBox";
import FormUpload from "../component/Form.Upload";

export default class Upload extends Component {
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