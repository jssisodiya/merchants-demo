import React from 'react';

import utils from '../utils';

const BidCard = ({ bid }) => {
  return (
    <div className="message is-info" style={{ marginBottom: '8px' }}>
      <div className="message-body">
        <div className="content">
          <div className="is-flex">
            <h5 className="" style={{ marginBottom: '4px', fontWeight: 500 }}>
              <span role="img" aria-label="car">
                🚗
              </span>{' '}
              {bid.title}
            </h5>
            <div className="is-size-6" style={{ marginLeft: 'auto' }}>
              {utils.formatDatetime(bid.created, true)}
            </div>
          </div>

          <div className="has-text-grey">
            € {utils.formatNumber(bid.amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
