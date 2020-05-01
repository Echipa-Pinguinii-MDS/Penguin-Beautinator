import React from 'react';
import Title from './Content/Title';
import About from './Content/About';
import Gallery from './Content/Gallery';
import Contact from './Content/Contact';
import Services from './Content/Services';
import PropTypes from 'prop-types';

const Content = (props) => {
    return (
        <div className={'Content'}>
            <Title name={props.name}/>
            <About title={props.sections.about} description={props.description}/>
            <Services title={props.sections.services} services={props.services}/>
            <Gallery title={props.sections.gallery} images={props.images}/>
            <Contact title={props.sections.contact}
                     program={props.program}
                     email={props.email}
                     phone={props.phone}
                     address={props.address}/>
        </div>
    )
};

Content.defaultProps = {
    sections: {about: 'Despre noi', services: 'Servicii', gallery: 'Galerie', contact: 'Contact'}
}

Content.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    services: PropTypes.array.isRequired,
    images: PropTypes.array,
    program: PropTypes.array.isRequired,
    phone: PropTypes.array.isRequired,
    email: PropTypes.array.isRequired,
    address: PropTypes.string.isRequired
}

export default Content;
