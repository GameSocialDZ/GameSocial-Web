import React, {Component} from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'


class ModalLinkAccounts extends Component {
  renderLinkModal = () => {
    return(
      <div>
        <Button fluid>Link Microsoft Account</Button>
        <Button fluid>Link Sony Account</Button>
        <Button fluid>Link Steam Account</Button>
        <Button fluid>Link Nintendo Account</Button>
        <Button fluid
          // onClick={this.props.FacebookLogin}
        >Link Facebook Account</Button>
        <Button fluid
          // onClick={this.props.TwitterLogin}
        >Link Twitter Account</Button>
      </div>
    );
  };

  render() {
    return (
    <Modal trigger={<Button color={'orange'}>Link</Button>}>
      <Modal.Header>Account Link</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Select an account to link</Header>
          {this.renderLinkModal()}
        </Modal.Description>
      </Modal.Content>
    </Modal>
    );
  }
}

export default ModalLinkAccounts;