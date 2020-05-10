import React from 'react';
import PropTypes from 'prop-types';

const Gallery = (props) => {
    return (
        <section className={'Gallery'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <div className={'Gallery-images'}>
                {props.images.map((image, index) =>
                    <img key={index} src={image} alt={'Salon image'}/>
                )}
            </div>
        </section>
    )
};

Gallery.propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
};

export default Gallery;
