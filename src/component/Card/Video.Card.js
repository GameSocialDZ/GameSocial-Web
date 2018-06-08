import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Player} from 'video-react';
import _ from 'lodash';

import {Button, Card, Image, Segment} from 'semantic-ui-react';

import FormEditUserUpload from '../Form/Form.EditUserUpload';

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
      <Segment>
      <Card fluid>
        <Player
          className="card-img-top"
          alt="upload" aspectRatio='16:9'
          controls={false} playsInline={true}
          muted={true} autoPlay={false} loop={false}>
          <source src={video.url}/>
        </Player>
          {
            this.state.editing === true ? (
              <Card.Content>
                <FormEditUserUpload
                  onSubmit={this.onSubmit.bind(this)}
                  uploadId={video.id}
                  type={video.config.type}
                  title={video.content.title}
                  caption={video.content.caption}/>
              </Card.Content>
            ):(
              <Card.Content>
                <Image
                  style={{borderRadius: '9rem'}}
                  floated='right' size='mini' src={video.publisher.avatar.url}/>
                <Card.Meta textAlign='right'>{video.publisher.username}</Card.Meta>
                <Card.Header>{video.content.title}</Card.Header>
                <Card.Meta><span className='date'>{video.content.createdAt}</span></Card.Meta>
                <Card.Description>{video.content.caption}</Card.Description>
              </Card.Content>
            )
          }
          <Button.Group>
            <Button type="button">
              <Link to={`/view/${video.publisher.id}/${video.config.type}/${video.id}`}>View</Link>
            </Button>
            {
              (history.location.pathname === '/profile' && currentUser !== null) &&
              <Button
                type="button"
                onClick={() => this.setFormState(this.state.editing)}>Edit</Button>
            }
          </Button.Group>
      </Card>
      </Segment>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.auth.cuurentUser,
});

export default connect(mapStateToProps)(VideoCard);