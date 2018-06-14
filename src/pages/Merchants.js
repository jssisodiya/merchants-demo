import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Lodash
import _map from 'lodash/map';
import _size from 'lodash/size';

// Actions
import * as MerchantActions from '../actions/MerchantActions';

// Components
import MerchantCard from '../components/MerchantCard';
import Pagination from '../components/Pagination';

class Merchants extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, limit: 5 };
  }

  componentDidMount() {
    this.triggerAction();
  }
  triggerAction() {
    const requestFor = `all:${this.state.page}:${this.state.limit}`;
    const merchantsStatus = this.props.status.merchants[requestFor] || {};
    if (
      merchantsStatus.progress !== 'fetching' &&
      merchantsStatus.progress !== 'fetched'
    ) {
      this.props.dispatch(
        MerchantActions.fetchMerchants(
          { page: this.state.page, limit: this.state.limit },
          {
            request: 'merchants',
            requestFor
          }
        )
      );
    }
  }
  handlePageClick = page => {
    this.setState({ page }, () => {
      this.triggerAction();
    });
  };
  render() {
    const { merchants, status } = this.props;
    const requestFor = `all:${this.state.page}:${this.state.limit}`;
    const allMerchants = _map(merchants.merchantList[requestFor], mId => {
      return merchants.merchantMap[mId];
    });
    const merchantsStatus = status.merchants[requestFor] || {};

    const merchantGrid = merchants.merchantGrid[requestFor] || { total: 0 };
    const totalPages = Math.ceil(merchantGrid.total / this.state.limit);

    return (
      <div className="">
        <div className="content is-flex">
          <h4 className="title is-4">All Merchants</h4>
          <button
            className="button is-rounded is-link"
            onClick={() => {
              this.props.history.push('/merchants/new');
            }}
            style={{ marginLeft: 'auto' }}>
            Add a new merchant
          </button>
        </div>
        {merchantsStatus.progress === 'fetching' && (
          <div className="box is-size-6 has-text-dark has-text-weight-semibold">
            Loading merchants...
          </div>
        )}
        {merchantsStatus.progress === 'fetched' &&
          _size(allMerchants) === 0 && (
            <div className="notification is-warning">
              No merchants found. Please add one.
            </div>
          )}
        <div className="">
          {_map(allMerchants, merchant => {
            if (!merchant) {
              return <div />;
            }
            return (
              <Link to={`/merchants/${merchant.id}`} className="">
                <MerchantCard merchant={merchant} />
              </Link>
            );
          })}
        </div>
        <div style={{ margin: '24px 0px' }}>
          <Pagination
            totalPages={totalPages}
            currentPage={this.state.page}
            handlePageClick={this.handlePageClick}
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

export default connect(mapStateToProps)(Merchants);
