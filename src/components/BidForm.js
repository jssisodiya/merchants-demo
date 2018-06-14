import React from 'react';

// Components
import FormInput from './FormInput';

class BidForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formData: {}, showForm: true };
  }
  componentWillReceiveProps(nextProps) {
    const newStatus = nextProps.status || {};
    if (
      newStatus.progress === 'fetched' &&
      this.props.status &&
      this.props.status.progress === 'fetching'
    ) {
      // reset the form after successful bid creation
      this.setState({ showForm: false, formData: {} }, () => {
        this.setState({ showForm: true });
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit && this.props.handleSubmit(this.state.formData);
  };
  handleChange = (name, value) => {
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({ formData });
  };
  render() {
    const status = this.props.status;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.showForm && (
          <div>
            <FormInput
              type="text"
              placeholder="Enter car title"
              label="Car title"
              name="title"
              key="forminput:title"
              required
              handleChange={this.handleChange}
            />
            <FormInput
              type="number"
              placeholder="Enter amount for your bid"
              label="Bid amount"
              name="amount"
              key="forminput:amount"
              required
              handleChange={this.handleChange}
            />
            <button
              disabled={status.progress === 'fetching'}
              className={`button is-primary ${
                status.progress === 'fetching' ? 'is-loading' : ''
              }`}
              type="submit">
              Submit
            </button>
          </div>
        )}
      </form>
    );
  }
}

export default BidForm;
