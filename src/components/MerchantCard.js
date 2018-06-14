import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import utils from '../utils';

// Actions
import * as MerchantActions from '../actions/MerchantActions';

class MerchantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteModal: false };
  }
  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };
  handleMerchantDelete = e => {
    e && e.preventDefault();
    this.props.dispatch(
      MerchantActions.deleteMerchant(this.props.merchant, {
        request: 'merchants',
        requestFor: `delete:${this.props.merchant.id}`
      })
    );
  };
  _renderDeleleModal() {
    const { status } = this.props;
    const deleteStatus =
      status.merchants[`delete:${this.props.merchant.id}`] || {};
    return (
      <div className={`modal ${this.state.showDeleteModal ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="message is-danger">
            <div className="message-body content">
              <h5 style={{ marginBottom: '8px' }}>
                Are you sure you want to delete this merchant -{' '}
                <strong>{this.props.merchant.first_name}</strong>?
              </h5>
              <button
                onClick={this.handleMerchantDelete}
                className="button is-danger"
                type="button"
                disabled={deleteStatus.progress === 'fetching'}>
                {deleteStatus.progress === 'fetching'
                  ? 'Deleting...'
                  : 'Go Ahead'}
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                onClick={this.closeDeleteModal}
                className="button is-dark"
                type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <button
          className="modal-close"
          aria-label="close"
          onClick={this.closeDeleteModal}
        />
      </div>
    );
  }
  render() {
    const merchant = this.props.merchant;
    if (!merchant) {
      return <div />;
    }
    return (
      <div className="message is-dark" style={{ marginBottom: '8px' }}>
        <div className="message-body">
          <div>
            <div className="media">
              <div className="media-left">
                <figure style={{ margin: 'auto' }} className="image is-48x48">
                  <img
                    className="is-rounded"
                    src={merchant.avatar_url}
                    alt=" "
                  />
                </figure>
              </div>
              <div className="media-content content">
                <div className="is-flex">
                  <h4 className="" style={{ marginBottom: '8px' }}>
                    {merchant.first_name} {merchant.last_name}
                  </h4>
                  <div
                    className=""
                    style={{ marginLeft: 'auto', marginBottom: '8px' }}>
                    <Link
                      className="button is-light is-outlined"
                      to={`/merchants/edit/${merchant.id}`}>
                      <span role="img" aria-label="Edit">
                        ✏️
                      </span>
                    </Link>
                    &nbsp;&nbsp;
                    <button
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setState({ showDeleteModal: true });
                      }}
                      className="button is-light is-outlined"
                      type={'button'}>
                      <span role="img" aria-label="Delete">
                        ❌
                      </span>
                    </button>
                  </div>
                </div>
                <div className="is-flex">
                  <h6
                    className="has-text-grey"
                    style={{ marginBottom: '4px', fontWeight: 400 }}>
                    {merchant.email}
                  </h6>

                  <div className="is-size-6" style={{ marginLeft: 'auto' }}>
                    {merchant.has_premium && (
                      <span>
                        <span role="img" aria-label="Premium">
                          💰
                        </span>{' '}
                        Premium &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                      </span>
                    )}
                    <span>
                      <span role="img" aria-label="Created">
                        📆
                      </span>{' '}
                      {utils.formatDatetime(merchant.created)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this._renderDeleleModal()}
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

export default connect(mapStateToProps)(MerchantCard);
