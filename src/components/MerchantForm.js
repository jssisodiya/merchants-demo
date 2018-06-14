import React from 'react';

// Components
import FormInput from './FormInput';

class MerchantForm extends React.Component {
  constructor(props) {
    super(props);
    const merchant = props.merchant;
    this.state = merchant
      ? {
          formData: {
            first_name: merchant.first_name,
            last_name: merchant.last_name,
            avatar_url: merchant.avatar_url,
            email: merchant.email,
            has_premium: merchant.has_premium
          }
        }
      : { formData: {} };
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
        <FormInput
          type="text"
          placeholder="Enter first name"
          label="First Name"
          name="first_name"
          key="forminput:first_name"
          required
          defaultValue={this.state.formData.first_name}
          handleChange={this.handleChange}
        />
        <FormInput
          type="text"
          placeholder="Enter last name"
          label="Last Name"
          name="last_name"
          key="forminput:last_name"
          required
          defaultValue={this.state.formData.last_name}
          handleChange={this.handleChange}
        />
        <FormInput
          type="text"
          placeholder="Avatar URL"
          label="Avatar URL"
          name="avatar_url"
          key="forminput:avatar_url"
          defaultValue={this.state.formData.avatar_url}
          handleChange={this.handleChange}
          help="Don't worry, you can leave it blank, we will assign a cool avatar for you."
        />
        <FormInput
          type="email"
          placeholder="Enter email address (john@doe.com)"
          label="Email"
          name="email"
          key="forminput:email"
          required
          defaultValue={this.state.formData.email}
          handleChange={this.handleChange}
        />
        <FormInput
          type="checkbox"
          placeholder="hasPremium"
          label="Premium account?"
          name="has_premium"
          key="forminput:has_premium"
          defaultValue={this.state.formData.has_premium}
          handleChange={this.handleChange}
        />
        <button
          disabled={status.progress === 'fetching'}
          className={`button is-primary is-medium ${
            status.progress === 'fetching' ? 'is-loading' : ''
          }`}
          type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default MerchantForm;
