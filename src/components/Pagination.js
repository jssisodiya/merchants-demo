import React from 'react';

// Lodash
import _range from 'lodash/range';
import _map from 'lodash/map';

class Pagination extends React.Component {
  handlePrevious = () => {
    this.props.handlePageClick &&
      this.props.handlePageClick(this.props.currentPage - 1);
  };
  handleNext = () => {
    this.props.handlePageClick &&
      this.props.handlePageClick(this.props.currentPage + 1);
  };
  render() {
    const { totalPages, currentPage } = this.props;
    if (!totalPages) {
      return <div />;
    }
    return (
      <nav className="pagination is-rounded" aria-label="pagination">
        {currentPage + 1 !== 1 && (
          <a onClick={this.handlePrevious} className="pagination-previous">
            Previous
          </a>
        )}
        {currentPage + 1 !== totalPages && (
          <a onClick={this.handleNext} className="pagination-next">
            Next page
          </a>
        )}
        <ul className="pagination-list">
          {_map(_range(1, totalPages + 1), pageNo => {
            return (
              <li>
                <a
                  onClick={this.props.handlePageClick.bind(null, pageNo - 1)}
                  className={`pagination-link ${
                    pageNo === currentPage + 1 ? 'is-current' : ''
                  }`}
                  aria-label={
                    pageNo === currentPage + 1
                      ? `Page ${pageNo}`
                      : `Goto page ${pageNo}`
                  }>
                  {pageNo}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
