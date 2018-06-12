import React from 'react';

import FormInput from './FormInput';

class MerchantForm extends React.Component {
  render() {
    return (
      <form>
        <FormInput
          type="text"
          placeholder="Enter first name"
          label="First Name"
        />
        <FormInput
          type="text"
          placeholder="Enter last name"
          label="Last Name"
        />
        <FormInput type="text" placeholder="Avatar URL" label="Avatar URL" />
        <FormInput
          type="email"
          placeholder="Enter email address (john@doe.com)"
          label="Email"
        />
        <FormInput
          type="checkbox"
          placeholder="hasPremium"
          label="Does it has premium account"
        />
      </form>
    );
  }
}

export default MerchantForm;
