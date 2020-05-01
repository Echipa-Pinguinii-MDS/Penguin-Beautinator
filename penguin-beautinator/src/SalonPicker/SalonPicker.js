import React from 'react';
import SalonCard from './SalonCard';
import Review from './Review';
import './SalonPicker.css';

const SalonPicker = () => {
    return (
        <div className={'SalonPicker'}>
            <SalonCard src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'}
                       name={'Nume'}
                       address={'Adresa'}
                       description={'Descriere'}
                       services={'Coafor / Epilat / Masaj / Manipedi'}/>
            <Review noFullStars={3}
                    noReviews={1}
                    noDollars={2}/>
        </div>
    )
}

export default SalonPicker;
