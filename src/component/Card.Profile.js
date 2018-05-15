import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setView} from "../actions/action.view";

class CardProfile extends Component {
  setViewState() {
    this.props.setView(this.props.upload);
  };

  render() {
    const upload = this.props.upload;
    return (
      <div className="col-md-4">
        <div id={this.key} className="card mb-4 box-shadow">
          <img
            className="card-img-top" alt="upload"
            src={upload.source.url}/>
          <div className="card-body">
            <div className="card-header">{upload.content.title}</div>
            <p className="card-text">{upload.content.caption}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary"
                      onClick={this.setViewState.bind(this)}>View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small>{upload.content.createdAt}</small>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(null, {setView})(CardProfile);