import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ImageCard from "../component/Card/Image.Card";
import VideoCard from "../component/Card/Video.Card";
import ProfileCard from "../component/Card/Prorfile.Card";
import MenuProfile from "../component/Menu/Menu.Profile";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'images'
    }
  }

  componentWillMount() {
    this.props.getUser(this.props.currentUser.uid);
  }

  renderUserImages(images) {
    return _.map(images, (image) => {
      return (
        <Grid.Column key={image.id}>
          <ImageCard
            image={image}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  renderUserVideos(videos) {
    return _.map(videos, (video) => {
      return (
        <Grid.Column key={video.id}>
          <VideoCard
            video={video}
            history={this.props.history}/>
        </Grid.Column>
      )
    });
  }

  getActiveMenu(state){
    this.setState({
      activeMenu: state
    })
  }

  render() {
    const {profile, images, videos, user, auth, currentUser} = this.props;

    if (user.loading || auth.loading) {
      return <Header as={'h1'}>Loading...</Header>
    }

    if (_.isEmpty(currentUser) || auth.error){
      return <Redirect to="/" />
    }

    return (
      <div style={{marginTop: '5rem'}}>
        <div>
          <ProfileCard
            profile={profile}/>
        </div>
        <MenuProfile
          getActiveMenu={(state) => this.getActiveMenu(state)}/>
        {
          this.state.activeMenu === 'images' &&
          (
            <Container>
              <Grid stackable columns={3}>
                <Grid.Row>
                  {this.renderUserImages(images)}
                </Grid.Row>
              </Grid>
            </Container>
          )
        }
        {
          this.state.activeMenu === 'videos' &&
          (
            <Container>
              <Grid stackable columns={3}>
                <Grid.Row>
                  {this.renderUserVideos(videos)}
                </Grid.Row>
              </Grid>
            </Container>
          )
        }
          </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  profile: state.user.data.profile,
  currentUser: state.auth.currentUser,
  images: state.user.data.images,
  videos: state.user.data.videos,
});

export default connect(mapStateToProps,
  {getAuth, getUser})(Profile);