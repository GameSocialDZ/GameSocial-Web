import React from 'react';
import {connect} from 'react-redux';
import DropZone from 'react-dropzone';

class FormDropzone extends React.Component {
  render() {
    // Parent Props
    const {disabled, handleOnDrop, file, fileLabel, directions, fileType} = this.props;
    return (
      <section>
        <div className="dropzone" style={{textAlign: 'center' && '-webkit-center'}}>
          <DropZone
            name="file"
            accept={fileType}
            onDrop={handleOnDrop}
            disabled={disabled}
          >
            <h2>{fileLabel}</h2>
            <p>{directions}</p>
          </DropZone>
        </div>
        <aside>
          <ul>
            {
              file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default connect()(FormDropzone);