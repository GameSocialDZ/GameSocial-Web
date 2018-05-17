import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Player} from 'video-react';

import {getView} from "../actions/action.view";

class VideoCard extends Component {
  getViewState() {
    this.props.getView(this.props.video);
  };

  render() {
    const video = this.props.video;
    const history = this.props.history;
    const {currentUser} = this.props;

    //TODO: Remove debug
    console.log(video);

    return (
      <div className="col-md-4">
        <div id={this.key} className="card mb-4 box-shadow">
          <Player className="card-img-top" alt="upload" aspectRatio='16:9' controls={false} playsInline={true} muted={true} autoPlay={false} loop={false}>
            <source src={video.url}/>
          </Player>
          <div className="card-body">
            <div className="card-header">{video.content.title}</div>
            <p className="card-text">{video.content.caption}</p>
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
            <small>{video.content.createdAt}</small>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.auth.cuurentUser
});

export default connect(mapStateToProps, {getView})(VideoCard);