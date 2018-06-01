import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getView} from "../../actions/action.view";
import {getUser, getUserOnce} from '../../actions/action.user';

import {Image, Card, Button, Container, Segment} from 'semantic-ui-react';

import FormEditUserUpload from '../Form/Form.EditUserUpload';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  // Close form on submit
  onSubmit() {
    this.setState({
      editing: false
    })
  }

  // On click set the redux view state with upload details
  getViewState() {
    const {getView, image} = this.props;
    getView(image);
  };

  // Edit form button switching
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
      <Segment>
      <Card fluid>
        <Image alt="upload" src={image.url}/>
          {
            // Render card details if not editing
            this.state.editing === true ? (
              <Card.Content>
                <FormEditUserUpload
                  onSubmit={this.onSubmit.bind(this)}
                  uploadId={image.id}
                  type={image.config.type}
                  title={image.content.title}
                  caption={image.content.caption}/>
              </Card.Content>
            ):(
              <Card.Content>
                <Image
                  style={{borderRadius: '9rem'}}
                  floated='right' size='mini' src={image.publisher.avatar.url}/>
                <Card.Meta textAlign='right'>{image.publisher.username}</Card.Meta>
                <Card.Header>{image.content.title}</Card.Header>
                <Card.Meta><span className='date'>{image.content.createdAt}</span></Card.Meta>
                <Card.Description>{image.content.caption}</Card.Description>
              </Card.Content>
            )
          }
          <Button.Group>
            <Button type="button" onClick={this.getViewState.bind(this)}>
              <Link className="" to="/view">View</Link>
            </Button>
            {
              // Disable Edit button if on profile page and unAuthorized (not logged in)
              (history.location.pathname === '/profile' && currentUser !==null) &&
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
  currentUser: state.auth.currentUser,
  user: state.user.data
});

export default connect(mapStateToProps,
  {getView, getUser, getUserOnce})
(ImageCard);