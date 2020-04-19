import React from 'react';
import Menu from './Menu.js';
import Content from './Content';
import './SalonApp.css';

const SalonApp = (props) => {
    return (
        <article className={'SalonApp'}>
            <Menu sections={props.sections}/>
            <div className={'VerticalLine'}/>
            <Content name={'Nume salon'}
                     sections={props.sections}
                     description={'Lorem ipsum sit amet'}
                     services={[{title: 'Tuns - par scurt', price: 10, length: 20},
                         {title: 'Tuns - par mediu', price: 15, length: 25},
                         {title: 'Tuns - par lung', price: 20, length: 30}]}
                     program={['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00']}
                     phone={['07********', '031*******']}
                     email={['contact@salon.com']}/>
        </article>
    )
};

SalonApp.defaultProps = {
    sections: {about: 'Despre noi', services: 'Servicii', gallery: 'Galerie', contact: 'Contact'}
}

export default SalonApp;
