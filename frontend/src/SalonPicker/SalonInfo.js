import PropTypes from 'prop-types';

const SalonInfo = (props) => {
    return (
        < div;
    className = {'SalonInfo'} >
        < p > {props.name} < /p>
        < p > {props.address} < /p>
        < p > {props.description} < /p>
        < /div>;
)
};

SalonInfo.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default SalonInfo;
