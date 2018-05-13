import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({text}) => {
	return (
		<span style={{color: 'red', marginLeft: '1rem'}}>{text}</span>
	);
};

InlineError.propTypes = {
	text: PropTypes.string.isRequired
};

export default InlineError;
