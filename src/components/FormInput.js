import React from 'react';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.defaultValue || '' };
  }
  handleChange = e => {
    const content =
      this.props.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ content }, () => {
      this.props.handleChange &&
        this.props.handleChange(this.props.name, this.state.content);
    });
  };
  render() {
    return (
      <div className="field">
        <label className={'label'}>
          {this.props.label}&nbsp;&nbsp;
          <input
            className={this.props.type === 'checkbox' ? '' : 'input'}
            required={this.props.required}
            onChange={this.handleChange}
            value={this.state.content}
            checked={this.state.content}
            name={this.props.name}
            type={this.props.type || 'text'}
            placeholder={this.props.placeholder || 'Enter value'}
          />
          {this.props.help && <p className="help is-dark">{this.props.help}</p>}
        </label>
        {/* {labelNode} {inputNode} */}
      </div>
    );
  }
}

export default FormInput;
