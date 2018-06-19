import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Button, Form, Comment, Header } from 'semantic-ui-react';
import {reduxForm, reset, Field} from "redux-form";

import {addComment, getComments, getCommentsOnce, getCommentsPromise} from "../../actions/action.comments";
import CommonInput from "../Common/Common.Input";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingComments: true
    }
  }
  componentWillMount() {
    this.setState({
      loadingComments: true
    })
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    console.log(this.props.view.data.id);
    this.props.getComments(this.props.view.data.id);
  }

  onSubmit(values) {
    values.profile = this.props.view.data.publisher;
    this.props.addComment(this.props.view.data.id, values);
    this.props.dispatch(reset('comments'));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  renderCommentList() {
    const {comments} = this.props;
    console.log(comments);
    return _.map(comments.data, comment => {
      let infoArray = Object.values(comment);
      return (
        <Comment key={infoArray[1]} >
          <Comment.Avatar src={infoArray[2].avatar.url} />
          <Comment.Content>
            <Comment.Author as='a'>{infoArray[2].username}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{infoArray[0]}!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    })
  }

  render() {
    // if(this.props.comments.loading){
    //   return <div>Loading...</div>
    // }

    console.log(this.renderCommentList());
    return(
      <div>
        <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <Field
            label="Comment"
            name="comment"
            component={CommonInput}
            type="text-area" required
            onChange={this.handleChange}/>
          <Button
            type="submit" disabled={this.props.pristine || this.props.submitting}>
            Submit</Button>
        </Form>
        <div>
          <Comment.Group>
            <Header as={'h3'} dividing>
              Comments
            </Header>
              {this.renderCommentList()}
          </Comment.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments,
  view: state.view
});

Comments = connect(mapStateToProps,
  {getComments, getCommentsOnce, getCommentsPromise, addComment})
(Comments);

export default reduxForm({
  form: 'comments',
})(Comments);