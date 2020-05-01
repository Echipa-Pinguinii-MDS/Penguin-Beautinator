import React from 'react';
import PropTypes from 'prop-types';

const PriceRange = (props) => {
    return (
        <div className={'di8'}>
            {[1, 2, 3, 4, 5].map((index) =>
                index <= props.noDollars ? '$' : ''
            )}
        </div>
    )
}

PriceRange.propTypes = {
    noDollars: PropTypes.number.isRequired
}

export default PriceRange;
