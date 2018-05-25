import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import FormUpload from './Form.Upload';

const ModalUpload = () => (
  <Modal trigger={<Button>Upload</Button>}>
    <Modal.Header>Upload</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Select an Image or Video</Header>
        <FormUpload/>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalUpload