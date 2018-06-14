import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import MerchantForm from '../components/MerchantForm';

// Actions
import * as MerchantActions from '../actions/MerchantActions';

class EditMerchant extends React.Component {
  componentDidMount() {
    this.triggerAction();
  }
  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    const nextNewMerchantStatus = status.merchants.new || {};
    const newMerchantStatus = this.props.status.merchants.new || {};
    if (
      newMerchantStatus.progress === 'fetching' &&
      nextNewMerchantStatus.progress === 'fetched'
    ) {
      window.location = `/merchants/${this.getMerchantId()}`;
    }
  }
  triggerAction() {
    const requestFor = this.getMerchantId();
    const merchantsStatus = this.props.status.merchants[requestFor] || {};
    if (
      merchantsStatus.progress !== 'fetching' &&
      merchantsStatus.progress !== 'fetched'
    ) {
      this.props.dispatch(
        MerchantActions.fetchMerchant(
          { id: this.getMerchantId() },
          {
            request: 'merchants',
            requestFor
          }
        )
      );
    }
  }

  handleSubmit = formData => {
    const merchantId = this.getMerchantId();
    let merchant = this.props.merchants.merchantMap[merchantId];
    merchant = { ...merchant, ...formData };
    this.props.dispatch(
      MerchantActions.createMerchant(merchant, {
        request: 'merchants',
        requestFor: 'new'
      })
    );
  };
  getMerchantId(props = this.props) {
    return props.match.params.merchantId;
  }
  render() {
    const { status, merchants } = this.props;
    const newMerchantStatus = status.merchants.new || {};
    const merchantId = this.getMerchantId();
    const merchantStatus = status.merchants[merchantId] || {};
    const merchant = merchants.merchantMap[merchantId];
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

        <h5 className="title is-5">Edit Merchant</h5>
        {merchantStatus.progress === 'fetching' && (
          <div className="box is-size-6 has-text-dark has-text-weight-semibold">
            Fetching details...
          </div>
        )}
        <div style={{ maxWidth: '600px' }}>
          {merchantStatus.progress === 'fetched' &&
            merchant && (
              <MerchantForm
                merchant={merchant}
                status={newMerchantStatus}
                handleSubmit={this.handleSubmit}
              />
            )}
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

export default connect(mapStateToProps)(EditMerchant);
