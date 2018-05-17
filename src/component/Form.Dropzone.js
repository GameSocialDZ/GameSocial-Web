import React from 'react';
import {connect} from 'react-redux';
import DropZone from 'react-dropzone';

import './form.css';

class FormDropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files:[],
      disabled: false,
    };
  }

  onDrop(files) {
    this.setState({
      disabled: files.length === 1
    });
  }

  render() {

    return (
      <section>
        <div className="dropzone">
          <DropZone
            name="avatar"
            accept='image/*'
            onDrop={this.props.handleOnDrop}
            disabled={this.props.disabled}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </DropZone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.props.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default connect()(FormDropzone);