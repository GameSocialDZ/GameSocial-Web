import React from 'react';
import {connect} from 'react-redux';
import DropZone from 'react-dropzone';

class Dropzone extends React.Component {
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
      <div>
        <div
          className="dropzone"
          style={{textAlign: '-webkit-center' || 'center'}}>
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
      </div>
    );
  }
}

export default connect()(Dropzone);