import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getView} from "../actions/action.view";

import FormEditUserUpload from './Form.EditUserUpload';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  onSubmit() {
    this.setState({
      editing: false
    })
  }

  getViewState() {
    const {getView, image} = this.props;
    getView(image);
  };

  setFormState(editing) {
    if (editing){
      this.setState({
        editing: false
      });
    }else {
      this.setState({
        editing: true
      });
    }
  };

  render() {
    const {currentUser, history, image} = this.props;
    return (
      <div className="col-md-4">
        <div id={this.key} className="card mb-4 box-shadow">
          <img
            className="card-img-top" alt="upload"
            src={image.url}/>
          <div className="card-body">
            {
              this.state.editing === true ? (
                <FormEditUserUpload
                  //onSubmit={this.onSubmit.bind(this)}
                  uploadId={image.id}
                  type={image.config.type}
                  title={image.content.title}
                  caption={image.content.caption}/>
              ):(
                <div>
                  <div className="card-header">{image.content.title}</div>
                  <p className="card-text">{image.content.caption}</p>
              </div>
              )
            }
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.getViewState.bind(this)}>
                <Link className="" to="/view">View</Link>
              </button>
              {
                (history.location.pathname === '/profile' && currentUser !==null) ?
                (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => this.setFormState(this.state.editing)}>Edit</button>
                ):(
                <button type="button" className="btn btn-sm btn-outline-secondary">comment</button>
                )
              }
              </div>
            <small>{image.content.createdAt}</small>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {getView})(ImageCard);