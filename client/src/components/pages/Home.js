import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Home = ({isAuth, history}) => {
	isAuth && history.push('/dashboard');
	return (
		<div className=" wrap-home">
			<h1 className="home-page-title">Java Script Advanced Project</h1>
		</div>
	);
};

Home.propTypes = {
	isAuth: PropTypes.bool.isRequired,
};

Home.defaultProps = {
    isAuth: false,
};


export default connect(
	({auth}) => ({
		isAuth: auth.isAuth
	})
)(withRouter(Home));
