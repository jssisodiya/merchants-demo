import React from 'react';

// TODO default props

class FormInput extends React.Component {
  render() {
    return (
      <div>
        {this.props.label && <label>{this.props.label}</label>}
        <input
          type={this.props.type || 'text'}
          placeholder={this.props.placeholder || 'Enter value'}
        />
      </div>
    );
  }
}

export default FormInput;
