import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getView} from "../actions/action.view";

class ImageCard extends Component {
  getViewState() {
    this.props.getView(this.props.image);
  };

  render() {
    const image = this.props.image;
    const history = this.props.history;
    const {currentUser} = this.props;

    //TODO: Remove debug
    console.log(image);

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
  currentUser: state.auth.cuurentUser
});

export default connect(mapStateToProps, {getView})(ImageCard);