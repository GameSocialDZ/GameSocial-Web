import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Button, Form, Comment, Header } from 'semantic-ui-react';
import {reduxForm, reset, Field} from "redux-form";
import {Link} from 'react-router-dom'
;
import {addComment, getComments, getCommentsOnce, getCommentsPromise} from "../../actions/action.comments";
import CommonInput from "../Common/Common.Input";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
    this.setState({
      loadingComments: true,
      initState: false
    })
  }

  componentDidMount() {
    console.log(this.props.view.data.id);
    this.props.getCommentsPromise(this.props.view.data.id)
      .then(this.setState({loadingComments: false}));
  }

  onSubmit(values) {
    const currentUser = this.props.auth.currentUser;
    this.props.addComment(currentUser, this.props.view.data.id, values);
    this.props.dispatch(reset('comments'));
    this.props.getCommentsPromise(this.props.view.data.id)
      .then(this.setState({loadingComments: false}))
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
            <Comment.Author as={Link} to={`/profile/${comment.profile.id}`}>{infoArray[2].username}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{infoArray[0]}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    })
  }

  render() {
    const {comments} = this.props;
    if(comments.loading){
      return <div>Loading...</div>
    }

    console.log(this.renderCommentList());
    return(
      <div>
        {
          !_.isEmpty(this.props.auth.currentUser) &&
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
        }
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