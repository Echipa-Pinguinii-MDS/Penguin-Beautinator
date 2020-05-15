import React from 'react';
import PropTypes from 'prop-types';
import Title from './Content/Title';
import About from './Content/About';
import Gallery from './Content/Gallery';
import Contact from './Content/Contact';
import Services from './Content/Services';

const Content = (props) => {
    return (
        <div className={'Content'}>
            <Title name={props.salon.name}
                   noFullStars={props.salon.noFullStars}
                   noReviews={props.salon.noReviews}
                   noDollars={props.salon.noDollars}/>
            {props.hasContent('about', props.salon) &&
            <About title={props.sections.about}
                   description={props.salon.description}/>}
            <Services title={props.sections.services}
                      services={props.services}/>
            {props.hasContent('gallery', props.salon) &&
            <Gallery title={props.sections.gallery}
                     images={props.salon.images}/> }
            <Contact title={props.sections.contact}
                     program={props.salon.program}
                     email={props.salon.email}
                     phone={props.salon.phone}
                     address={props.salon.address}/>
        </div>
    )
}

Content.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string),
    salon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        noFullStars: PropTypes.number.isRequired,
        noReviews: PropTypes.number.isRequired,
        noDollars: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        program: PropTypes.array.isRequired,
        phone: PropTypes.array.isRequired,
        email: PropTypes.array.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired
}

export default Content;