import React from 'react';

export default class CommonInput extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    const {placeholder, input, label, type, accept, meta} = this.props;
    let error;
    if (meta.touched && meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (meta.touched && meta.warning) {
      warning = (
        <div className="form-warning">{meta.warning}</div>
      );
    }

    return (
      <div className="form-input">
        <label
          htmlFor={input.name}>
          {label}
          {error}
          {warning}
        </label>
        {
          type === 'textarea' ? (
            <textarea
              className="col-sm-12"
              {...input}
              id={input.name}
              ref={input => (this.input = input)}
            />
          ):(
            <input
              placeholder={placeholder !== null && placeholder}
              className="col-sm-12"
              {...input}
              id={input.name}
              type={type}
              accept={accept}
              ref={input => (this.input = input)}
            />
          )
        }
      </div>
    );
  }
}