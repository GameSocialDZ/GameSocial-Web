import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Player} from 'video-react';
import _ from 'lodash';

import {Button, Card, Image, Segment} from 'semantic-ui-react';

import FormEditUserUpload from '../Form/Form.EditUserUpload';

class PlaylistCard extends Component {
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
    const {auth, page, video} = this.props;
    return (
        <Card fluid>
          <Player
            className="card-img-top"
            alt="upload" aspectRatio='16:9'
            controls={false} playsInline={true}
            muted={true} autoPlay={false} loop={false}>
            <source src={video.url}/>
          </Player>
        </Card>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PlaylistCard);