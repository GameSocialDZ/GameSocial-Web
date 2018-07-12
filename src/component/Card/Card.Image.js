import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

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

  hover = () => {
    this.setState({
      hover: true
    })
  };

  unhover = () => {
    this.setState({
      hover: false
    })
  };

  render() {
    const {auth, page, image, user, activeMenu} = this.props;
    const {hover} = this.state;
    return (
      <Segment style={{backgroundColor: 'transparent', border: '0 none'}}>
      <Card
        as={Link} to={`/view/${image.publisher.id}/${image.config.type}/${image.id}`}
        fluid style={hover ? {background: 'rgb:(255, 255, 255)', boxShadow: 'rgb(204, 204, 204) 0px 0px 10px', zIndex: '1'}: null}
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}>
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
                  style={{borderRadius: '.25rem'}}
                  floated='right' size='mini' src={image.publisher.avatar.url}/>
                <Card.Meta textAlign='right'>{image.publisher.username}</Card.Meta>
                <Card.Header>{image.content.title}</Card.Header>
                <Card.Meta><span className='date'>{image.content.createdAt}</span></Card.Meta>
                {/*<Card.Description>{image.content.caption}</Card.Description>*/}
              </Card.Content>
            )
          }
          {
            // Disable Edit button if on profile page and unAuthorized (not logged in)
            page === 'profile' && (activeMenu === 'images') && auth.currentUser && user.data && auth.currentUser.uid === user.data.id &&
            <Button color={'orange'} type="button" onClick={() => this.setFormState(this.state.editing)}>Edit</Button>
          }
      </Card>
      </Segment>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps)
(ImageCard);