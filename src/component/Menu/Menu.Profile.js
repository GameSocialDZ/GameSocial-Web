import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Menu } from 'semantic-ui-react'
import _ from 'lodash';

class MenuProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { activeMenu: 'images' };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeMenu: name });
    this.props.getActiveMenu(name);
  };

  render() {
    const { activeMenu } = this.state;
    //const {followers, following, images, videos} = this.props;
    const {user} = this.props;
    return (
      <Menu tabular>
        <Menu.Item name='images' active={activeMenu === 'images'} onClick={this.handleItemClick}>
          Images {_.size(user.data.images)}
        </Menu.Item>
        <Menu.Item name='videos' active={activeMenu === 'videos'} onClick={this.handleItemClick}>
          Videos {_.size(user.data.videos)}
        </Menu.Item>
        <Menu.Item name='followers' active={activeMenu === 'followers'} onClick={this.handleItemClick}>
          Followers {_.size(user.data.followers)-1}
        </Menu.Item>
        <Menu.Item name='following' active={activeMenu === 'following'} onClick={this.handleItemClick}>
          Following {_.size(user.data.following)-1}
        </Menu.Item>
        <Menu.Item name='favorites' active={activeMenu === 'favorites'} onClick={this.handleItemClick}>
          Favorites {_.size(user.data.favorites)}
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MenuProfile);