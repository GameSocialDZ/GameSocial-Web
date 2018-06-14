import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import {Grid, Header, Container} from 'semantic-ui-react';

import {getUser, getUserPromise} from "../actions/action.user";
import {getAuth} from '../actions/action.auth';

import ImageCard from "../component/Card/Image.Card";
import VideoCard from "../component/Card/Video.Card";
import ProfileCard from "../component/Card/Prorfile.Card";
import MenuProfile from "../component/Menu/Menu.Profile";
import UserCard from '../component/Card/User.Card';

export class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'images',
    }
  }

  renderUserImages(images) {
    return _.map(images, (image) => {
      return (
        <Grid.Column key={image.id}>
          <ImageCard
            image={image}
            page={this.props.page}
          />
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
            page={this.props.page}
          />
        </Grid.Column>
      )
    });
  }

  renderUserFollowers(followers) {
    return _.map(followers, (follower) => {
      if(follower.id === 'default') {
        return <span key={follower.id}/>;
      } else {
        return (
          <Grid.Column key={follower.id}>
            <UserCard
              page={this.props.page}
              publisher={follower}
            />
          </Grid.Column>
        )
      }
    });
  }

  renderUserFollowing(following) {
    return _.map(following, (followee) => {
      if(followee.id === 'default') {
        return <span key={followee.id}/>;
      } else {
        return (
          <Grid.Column key={followee.id}>
            <UserCard
              page={this.props.page}
              publisher={followee}
            />
          </Grid.Column>
        )
      }
    });
  }

  getActiveMenu(state){
    this.setState({
      activeMenu: state
    })
  }

  render() {
    const {images, videos, user, following, followers} = this.props;

    if (user.loading) {
      return <Header as={'h1'}>Loading...</Header>
    }

    return (
      <div style={{marginTop: '5rem'}}>
          <div>
            <ProfileCard
              user={user.data}/>
          </div>
          <MenuProfile
            images={images}
            videos={videos}
            followers={followers}
            following={following}
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
          {
            this.state.activeMenu === 'followers' &&
            (
              <Container>
                <Grid stackable columns={3}>
                  <Grid.Row>
                    {this.renderUserFollowers(followers)}
                  </Grid.Row>
                </Grid>
              </Container>
            )
          }
          {
            this.state.activeMenu === 'following' &&
            (
              <Container>
                <Grid stackable columns={3}>
                  <Grid.Row>
                    {this.renderUserFollowing(following)}
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
  user: state.user
});

export default connect(mapStateToProps,
  {getAuth, getUser})(ProfileDetail);