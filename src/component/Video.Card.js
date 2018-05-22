import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Player} from 'video-react';

import FormEditUserUpload from './Form.EditUserUpload';

import {getView} from "../actions/action.view";

class VideoCard extends Component {
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
    const {video, getView} = this.props;
    getView(video);
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
    const {currentUser, history, video} = this.props;

    return (
      <div className="col-md-4">
        <div id={this.key} className="card mb-4 box-shadow">
          <Player className="card-img-top" alt="upload" aspectRatio='16:9' controls={false} playsInline={true} muted={true} autoPlay={false} loop={false}>
            <source src={video.url}/>
          </Player>
          <div className="card-body">
            {
              this.state.editing === true ? (
                <FormEditUserUpload
                  onSubmit={this.onSubmit.bind(this)}
                  uploadId={video.id}
                  type={video.config.type}
                  title={video.content.title}
                  caption={video.content.caption}/>
              ):(
                <div>
                  <div className="card-header">{video.content.title}</div>
                  <p className="card-text">{video.content.caption}</p>
                </div>
              )
            }
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.getViewState.bind(this)}>
                <Link className="" to="/view">View</Link>
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary">comment</button>
              {
                (history.location.pathname === '/profile' && currentUser !== null) &&
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => this.setFormState(this.state.editing)}>Edit</button>
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