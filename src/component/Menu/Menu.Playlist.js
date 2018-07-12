import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import { Dropdown, Icon, Input, Menu, Form, Message} from 'semantic-ui-react'
import {createPlaylist} from "../../actions/action.playlist";
import {database} from "../../firebase";
import ReactGA from '../../googleAnalytics';

class PlaylistMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: null,
      playlist: ''
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeMenu: name });
    this.props.getActiveMenu(name);
  };

  handleChange = (e, { name, value}) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { playlist } = this.state;
    const {auth} = this.props;

    ReactGA.event({
      category: 'Playlist',
      action: 'Playlist Created',
    });

    database.ref(`users/${auth.currentUser.uid}/playlist`).orderByChild('name').equalTo(playlist)
      .once('value', data => {
        const exist = !!data.val();
        if(!exist) {
          this.createNewPlaylist(playlist);
        } else {
          alert('Playlist already exist!');
        }
      })
  };

  createNewPlaylist(playlistName){
    const {auth} = this.props;
    this.props.createPlaylist(auth.currentUser.uid, playlistName);
  };

  renderPlaylistItems(){
    const {user} = this.props;
    const { activeMenu } = this.state;
    if(_.isEmpty(user.data.playlist)){
      return null;
    }
      return _.map(user.data.playlist, listee => {
        return (
          <Menu.Item key={listee.name} name={`${listee.name}`} active={activeMenu === `${listee.name}`} onClick={this.handleItemClick}>
            {listee.name}
          </Menu.Item>
        )
      })
  };

  // renderPlaylistGroupItems = () => {
  //   const {playlistGroup} = this.props;
  //   const {activeState} = this.state;
  //   return _.map(playlistGroup, groupee => {
  //     return (
  //       <Menu.Item name={`${groupee.id}`} active={activeItem === `${groupee.id}`} onClick={this.handleItemClick}>
  //         {groupee.name}
  //       </Menu.Item>
  //     )
  //   })
  // };

  render() {
    const { activeItem, playlist } = this.state;
    const {auth, user} = this.props;

    return (
      <Menu pointing secondary  vertical
            style={{float: 'left', marginRight: '.5rem'}}>
        <Menu.Item>
          <Input placeholder='Search...' />
        </Menu.Item>

        <Menu.Item>
          Playlist
          <Menu.Menu>
            {this.renderPlaylistItems()}
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          <Icon name='grid layout' />
          Browse Playlist
        </Menu.Item>
        {
         !_.isEmpty(auth.currentUser) && (auth.currentUser.uid === user.data.id) &&
         <Dropdown item text='Settings'>
           <Dropdown.Menu>
             <Form onSubmit={this.handleSubmit}>
               <Form.Group>
                 <Form.Input onChange={this.handleChange}
                  name={'playlist'} value={playlist} placeholder='Create Playlist' />
                 <Form.Button icon='plus' />
               </Form.Group>
             </Form>
           </Dropdown.Menu>
         </Dropdown>
        }
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  playlist: state.playlist
});

export default connect(mapStateToProps,
  {createPlaylist})
(PlaylistMenu);