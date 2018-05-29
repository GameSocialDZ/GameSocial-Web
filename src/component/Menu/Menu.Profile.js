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

    return (
      <Menu tabular>
        <Menu.Item name='images' active={activeMenu === 'images'} onClick={this.handleItemClick} />
        <Menu.Item name='videos' active={activeMenu === 'videos'} onClick={this.handleItemClick} />
        <Menu.Item name='followers' active={activeMenu === 'followers'} onClick={this.handleItemClick} />
        <Menu.Item name='following' active={activeMenu === 'following'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default MenuProfile;