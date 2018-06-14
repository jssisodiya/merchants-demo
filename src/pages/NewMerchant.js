import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

// Components
import MerchantForm from '../components/MerchantForm';

// Actions
import * as MerchantActions from '../actions/MerchantActions';

class NewMerchant extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    const nextNewMerchantStatus = status.merchants.new || {};
    const newMerchantStatus = this.props.status.merchants.new || {};
    if (
      newMerchantStatus.progress === 'fetching' &&
      nextNewMerchantStatus.progress === 'fetched'
    ) {
      window.location = '/';
    }
  }
  handleSubmit = formData => {
    formData.created = new Date().getTime();
    formData.id = uuid();
    if (!formData.avatar_url || formData.avatar_url === '') {
      formData.avatar_url = `https://api.adorable.io/avatars/240/${
        formData.id
      }.png`;
    }
    this.props.dispatch(
      MerchantActions.createMerchant(formData, {
        request: 'merchants',
        requestFor: 'new'
      })
    );
  };
  getMerchantId(props = this.props) {
    return props.match.params.merchantId;
  }
  render() {
    const { status } = this.props;
    const newMerchantStatus = status.merchants.new || {};
    return (
      <div className="content">
        <div style={{ marginBottom: '16px' }}>
          <Link
            to={'/'}
            className="button is-rounded"
            onClick={() => {
              this.props.history.push('/');
            }}>
            <span role="img" aria-label="left">
              👈
            </span>{' '}
            All Merchants
          </Link>
        </div>

        <h5 className="title is-5">
          Please fill the following details to add a new merchant
        </h5>
        <div style={{ maxWidth: '600px' }}>
          <MerchantForm
            status={newMerchantStatus}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    merchants: store.merchants,
    status: store.status
  };
}

export default connect(mapStateToProps)(NewMerchant);
