import React from 'react';
import SalonCard from "./SalonCard";

const SalonPicker = () => {
    return (
        <div>
            <SalonCard src={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png'}
                       name={'Nume'}
                       address={'Adresa'}
                       description={'Descriere'}
                       services={'Coafor / Epilat / Masaj / Manipedi'}
                       noDollars={2}
                       noFullStars={3}
                       noReviews={1}/>
        </div>
    )
}

export default SalonPicker;
