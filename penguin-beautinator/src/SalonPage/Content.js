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
            <Title name={props.salon.name}/>
            <About title={props.sections.about} description={props.salon.description}/>
            <Services title={props.sections.services} services={props.salon.services}/>
            <Gallery title={props.sections.gallery} images={props.salon.images}/>
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
        description: PropTypes.string,
        services: PropTypes.array.isRequired,
        images: PropTypes.array,
        program: PropTypes.array.isRequired,
        phone: PropTypes.array.isRequired,
        email: PropTypes.array.isRequired,
        address: PropTypes.string.isRequired
    })
}

export default Content;
