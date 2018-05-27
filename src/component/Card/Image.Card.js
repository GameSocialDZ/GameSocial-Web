import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getView} from "../../actions/action.view";

import {Image, Card, Button, Container} from 'semantic-ui-react';

import FormEditUserUpload from '../Form/Form.EditUserUpload';

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
      <Card fluid
        // style={{padding: '0 .5rem 0'}}
        >
        <Image alt="upload" src={image.url}/>
            {
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
            {/*<Button type="button">comment</Button>*/}
            {
              (history.location.pathname === '/profile' && currentUser !==null) &&
              <Button
                type="button"
                onClick={() => this.setFormState(this.state.editing)}>Edit</Button>
            }
            </Button.Group>
      </Card>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {getView})(ImageCard);