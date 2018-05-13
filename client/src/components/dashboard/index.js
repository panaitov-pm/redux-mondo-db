import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../AC/profile';

class Dashboard extends Component {

	componentDidMount() {
		const {getCurrentProfile} = this.props;
		getCurrentProfile();
	}

	render() {
		return (
			<div className="ui container">
				<h1>Dashboard</h1>
			</div>
		);
	}
}

Dashboard.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

Dashboard.propTypes = {
	isAuth: false,
	user: {},
	profile: {},
	isLoading: false,
};

export default connect(
	({auth, userProfile}) => ({
		isAuth: auth.isAuth,
		user: auth.user,
		profile: userProfile.profile,
		isLoading: userProfile.isLoading
	}),
	{getCurrentProfile}
)(Dashboard);
