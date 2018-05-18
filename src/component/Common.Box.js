import React, {Component} from 'react';

export default class CommonBox extends Component {
  render() {
    const {title, body, footer} = this.props;
    return(
      <div className="container">
        <div className="d-flex justify-content-center align-self-center">
          <div className="col-sm-12 jumbotron">
            <div className="card-block text-center">
              <div className="card-title">
                <h1>{title}</h1>
              </div>
              <div className="card-body">
                {body}
              </div>
              <div className="card-footer">
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
