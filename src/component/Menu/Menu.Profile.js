import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

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
    const {followers, following, images, videos} = this.props;
    return (
      <Menu tabular>
        <Menu.Item name='images' active={activeMenu === 'images'} onClick={this.handleItemClick}>
          Images {_.size(images)}
        </Menu.Item>
        <Menu.Item name='videos' active={activeMenu === 'videos'} onClick={this.handleItemClick}>
          Videos {_.size(videos)}
        </Menu.Item>
        <Menu.Item name='followers' active={activeMenu === 'followers'} onClick={this.handleItemClick}>
          Followers {_.size(followers)-1}
        </Menu.Item>
        <Menu.Item name='following' active={activeMenu === 'following'} onClick={this.handleItemClick}>
          Following {_.size(following)-1}
        </Menu.Item>
      </Menu>
    )
  }
}

export default MenuProfile;