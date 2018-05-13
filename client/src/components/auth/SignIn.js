import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {signIn} from '../../AC/auth';

class SignIn extends Component {
	state = {
		data: {
			name: '',
			password: '',
		},
		errors: {},
	};

	componentWillReceiveProps(nextProps) {
		const {data, errors} = this.state;
		this.setState({
			errors: nextProps.errors,
		});
	}

	componentDidMount() {
		const {isAuth, history} = this.props;
		isAuth && history.push('/dashboard');
	}

	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data: {...data, [target.name]: target.value},
		errors: {...errors, [target.name]: ''},
	}));

	handleSubmit = (e) => {
		e.preventDefault();

		const {data} = this.state;
		const {signIn, history} = this.props;
		signIn(data, history);

	};
	render() {
		const {data, errors} = this.state;
		const {isAuth, isLoading, user} = this.props;
		return (

			<Grid centered
			      columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field error={!!errors.email}>
							<label htmlFor="email">Email</label>
							<input
								name="email"
								value={data.email}
								onChange={this.handleChange}
								type="email" />
							{(!!errors.email) && <Label basic color='red' pointing='left'>{errors.email}</Label>}
						</Form.Field>
						<Form.Field error={!!errors.password}>
							<label htmlFor="password">Password</label>
							<input
								name="password"
								value={data.password}
								onChange={this.handleChange}
								type="password" />
							{(!!errors.password) && <Label basic color='red' pointing='left'>{errors.password}</Label>}
						</Form.Field>
						<Button type="submit" primary loading={isLoading}>Submit</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignIn.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

SignIn.defaultProps = {
	isAuth: false,
	isLoading: false,
	user: {},
	errors: {}
};


export default connect(
	({auth, errors, signIn}) =>({
		isAuth: auth.isAuth,
		user: auth.user,
		errors,
		isLoading: signIn.isLoading,
	}),
	{signIn}
)(withRouter(SignIn));
