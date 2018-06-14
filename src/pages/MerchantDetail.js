import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

// Lodash
import _map from 'lodash/map';
import _size from 'lodash/size';
import _orderBy from 'lodash/orderBy';
import _cloneDeep from 'lodash/cloneDeep';

// Actions
import * as MerchantActions from '../actions/MerchantActions';

// Components
import MerchantCard from '../components/MerchantCard';
import BidCard from '../components/BidCard';
import BidForm from '../components/BidForm';

class MerchantDetails extends React.Component {
  componentDidMount() {
    this.triggerAction();
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
  getMerchantId(props = this.props) {
    return props.match.params.merchantId;
  }
  handleBidSubmit = formData => {
    formData.created = new Date().getTime();
    formData.id = uuid();
    let merchant = _cloneDeep(
      this.props.merchants.merchantMap[this.getMerchantId()]
    );
    let allBids = merchant.bids || [];
    allBids.push(formData);
    merchant.bids = allBids;
    this.props.dispatch(
      MerchantActions.createMerchant(merchant, {
        request: 'merchants',
        requestFor: 'new'
      })
    );
  };
  render() {
    const { merchants, status } = this.props;
    const requestFor = this.getMerchantId();

    const merchantStatus = status.merchants[requestFor] || {};
    const newMerchantStatus = status.merchants.new || {};

    const merchant = merchants.merchantMap[this.getMerchantId()];
    return (
      <div className="">
        <div className="content is-flex">
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
        {merchantStatus.progress === 'fetching' && (
          <div className="box is-size-6 has-text-dark has-text-weight-semibold">
            Loading merchant details...
          </div>
        )}
        {merchantStatus.progress === 'fetched' &&
          !merchant && (
            <div className="notification is-warning">
              Merchant is either delete or does not exists.
            </div>
          )}
        {merchant &&
          merchant.id && (
            <div>
              <MerchantCard merchant={merchant} />
              <div className="columns is-tablet" style={{ marginTop: '24px' }}>
                <div className="column">
                  <div className="content">
                    <h4>Bids</h4>
                  </div>
                  {_size(merchant.bids) === 0 && (
                    <div className="notification is-warning">
                      There are no bids placed by this merchant. Why don't you
                      create one.
                    </div>
                  )}
                  {_map(_orderBy(merchant.bids, 'created', 'desc'), bid => {
                    return <BidCard key={`bidcard:${bid.id}`} bid={bid} />;
                  })}
                </div>
                <div className="column">
                  <div className="content">
                    <h4>Add Bid</h4>
                  </div>
                  <div className="card" style={{ borderRadius: '4px' }}>
                    <div className="card-content">
                      <BidForm
                        status={newMerchantStatus}
                        handleSubmit={this.handleBidSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default connect(mapStateToProps)(MerchantDetails);
