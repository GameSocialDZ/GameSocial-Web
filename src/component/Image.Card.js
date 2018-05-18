import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getView} from "../actions/action.view";

class ImageCard extends Component {
  getViewState() {
    const {getView, image} = this.props;
    getView(image);
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
            <div className="card-header">{image.content.title}</div>
            <p className="card-text">{image.content.caption}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.getViewState.bind(this)}>
                <Link className="" to="/view">View</Link>
              </button>
              {
                (history.location.pathname === '/profile' && currentUser !==null) ?
                (
                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
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