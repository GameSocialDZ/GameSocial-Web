import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

import FormEditProfile from './Form.EditProfile';

const ModalEditProfile = () => (
  <Modal trigger={<Button>Edit</Button>}>
    <Modal.Header>Edit Profile</Modal.Header>
    <Modal.Content >
      <Modal.Description>
        <Header>Select a new Avatar</Header>
        <FormEditProfile/>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalEditProfile;