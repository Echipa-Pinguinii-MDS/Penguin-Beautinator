import React from 'react';
import PropTypes from 'prop-types';

const Stars = (props) => {
    return (
        <div className={'di3'}>
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
        <div>
            <Stars noFullStars={props.noFullStars}/>
            <div id={'di7'}>Numar reviewuri: {props.noReviews}</div>
        </div>
    )
}

Review.propTypes = {
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired
}

export default Review;
