import React from 'react';
import PropTypes from 'prop-types';
import PriceRange from './PriceRange';

const Stars = (props) => {
    return (
        <div className={'Stars'} id={'di3'}>
            {[1, 2, 3, 4, 5].map((index) =>
                <img src={index <= props.noFullStars ? props.fullStar : props.emptyStar} alt={''}/>
            )}
        </div>
    )
}

Stars.defaultProps = {
    fullStar: 'https://www.seekicon.com/free-icon-download/star-icon_2.svg',
    emptyStar: 'https://www.seekicon.com/free-icon-download/star-outlined-icon_1.svg'
}

Stars.propTypes = {
    noFullStars: PropTypes.number.isRequired,
}

const Review = (props) => {
    return (
        <div className={'Review'}>
            <Stars noFullStars={props.noFullStars}/>
            <div id={'di7'}>{props.noReviews === 1 ? '1 review' : props.noReviews + 'reviewuri'}</div>
            <PriceRange noDollars={props.noDollars}/>
        </div>
    )
}

Review.propTypes = {
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired,
    noDollars: PropTypes.number.isRequired
}

export default Review;
