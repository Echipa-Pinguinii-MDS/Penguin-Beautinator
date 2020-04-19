import React from "react";
import PropTypes from "prop-types";

const Image = (props) => {
    return (
        <div key={props.index} className={'Image'}>
            <img src={props.image} alt={''}/>
        </div>
    )
};

Image.propTypes = {
    index: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};

const Gallery = (props) => {
    return (
        <section className={'Gallery'}>
            <h3>{props.images === [] ? props.title : ''}</h3>
            <div className={'Gallery-images'}>
                {props.images.map((image, index) =>
                    <Image index={index} image={image}/>
                )}
            </div>
        </section>
    )
};

Gallery.defaultProps = {
    images: []
};

Gallery.propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.array
};

export default Gallery;
