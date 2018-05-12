import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {Tab} from 'semantic-ui-react';

//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

import SimpleBox from "../component/SimpleBox";
import FormRegister from "../component/Form.Register";
import FormLogin from "../component/Form.Login";

class Register extends Component {
  renderRegisterFooter() {
    return(
      <div>
        <div className="col-sm-6 m-auto">
          <button
            className="btn btn-primary w-100"
            // onClick={this.props.FacebookLogin}
          >Facebook</button>
        </div>
        <br/>
        <div className="col-sm-6 m-auto">
          <button
            className="btn btn-primary w-100"
            // onClick={this.props.TwitterLogin}
          >Twitter</button>
        </div>
      </div>
    );
  }

  render() {

    // TODO: Implement Tab with semantic-ui-react
    // const panes = [
    //   { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    //   { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    // ];
    //
    // const TabExampleBasic = () => (
    //   <Tab panes={panes} />
    // );

    return (
      <div>
        <SimpleBox
          title="Register"
          body={<FormRegister/>}
          footer={this.renderRegisterFooter()}/>
        <SimpleBox
          title="Login"
          body={<FormLogin/>}
          footer={this.renderRegisterFooter()}/>
      </div>
    );
  }
}

export default connect(null/*,{FacebookLogin, TwitterLogin}*/)(Register);