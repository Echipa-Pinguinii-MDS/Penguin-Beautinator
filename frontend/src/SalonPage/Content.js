import React from 'react';
import {Element} from 'react-scroll';
import PropTypes from 'prop-types';
import Title from './Content/Title';
import About from './Content/About';
import Gallery from './Content/Gallery';
import Contact from './Content/Contact';
import Services from './Content/Services';

const Content = (props) => {
    return (
        <div className={'Content'}>
            <React.Fragment>
                <Title name={props.salon.name}
                       noFullStars={props.salon.noFullStars}
                       noReviews={props.salon.noReviews}
                       noDollars={props.salon.noDollars}/>

                <Element id={'about'}>
                    {props.hasContent('about', props.salon) &&
                    <About title={props.sections.about}
                           description={props.salon.description}/>}
                </Element>

                <Element id={'services'}>
                    <Services title={props.sections.services}
                              services={props.services}
                              handleClick={props.handleClick}
                              selected={props.selected}/>
                </Element>

                <Element id={'gallery'}>
                    {props.hasContent('gallery', props.salon) &&
                    <Gallery title={props.sections.gallery}
                             images={props.salon.images}/> }
                </Element>

                <Element id={'contact'}>
                    <Contact title={props.sections.contact}
                             program={props.salon.program}
                             email={props.salon.email}
                             phone={props.salon.phone}
                             address={props.salon.address}/>
                </Element>
            </React.Fragment>
        </div>
    )
}

Content.propTypes = {
    handleClick: PropTypes.func.isRequired,
    sections: PropTypes.objectOf(PropTypes.string),
    salon: PropTypes.object.isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired,
    selected: PropTypes.object.isRequired
}

export default Content;
