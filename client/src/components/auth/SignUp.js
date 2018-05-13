import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Grid, Transition, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {signUp} from '../../AC/auth';

class SignUp extends Component {
	state = {
		data: {
			name: '',
			email: '',
			password: '',
			password2: '',
		},
		errors: {},
		disabled : true,
		visible  : false
	};


	componentWillReceiveProps(nextProps) {
		this.setState({
			errors: nextProps.errors
		});
	}


	componentDidMount() {
		this.setState({visible: true});
		const {isAuth, history} = this.props;
		isAuth && history.push('/dashboard');
	}

	componentWillUnmount() {
		this.setState({visible: false});
	}


	handleChange = ({target}) => this.setState(({data, errors}) => ({
		data: {...data, [target.name]: target.value},
		errors: {...errors, [target.name]: ''},
	}));
	handleDisabled = () => this.setState({disabled: !this.state.disabled});

	handleSubmit = (e) => {
		e.preventDefault();
		const {signUp, history} = this.props;
		const {data} = this.state;
		signUp(data, history);
	};

	render() {
		const {disabled, visible, data, errors} = this.state;
		const {email, password, isLoading} = this.props;
		return (
			<Grid centered
			      columns={2}>
				<Grid.Column>
					<Form onSubmit={this.handleSubmit}>
						<Transition.Group animation="fade up"
						                  duration={1000}>
							{
								(visible) &&
								<Form.Field error={!!errors.name}>
									<label htmlFor="name">Name</label>
									<input
									       name="name"
									       value={data.name}
									       onChange={this.handleChange} />
									{(!!errors.name) && <Label basic color='red' pointing='left'>{errors.name}</Label>}
								</Form.Field>
							}
						</Transition.Group>
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
						<Transition.Group animation="fade down"
						                  duration={1000}>
							{
								(visible) &&
								<Form.Field error={!!errors.password2}>
									<label htmlFor="password2">Confirm Password</label>
									<input
										name="password2"
										value={data.password2}
										onChange={this.handleChange}
										type="password" />
									{(!!errors.password2) && <Label basic color='red' pointing='left'>{errors.password2}</Label>}
								</Form.Field>
							}
						</Transition.Group>
						<Form.Checkbox label="I agree to the Terms and Conditions"
						               onChange={this.handleDisabled} />
						<Button type="submit"
						        primary
						        loading={isLoading}
						        disabled={disabled}>Submit</Button>
					</Form>
				</Grid.Column>
			</Grid>
		);
	};
}

SignUp.propTypes = {
	isAuth   : PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	signUp   : PropTypes.func.isRequired
};

SignUp.defaultProps = {
	isAuth   : false,
	isLoading: false,
	signUp   : () => {
	}
};


export default connect(
	({auth, errors}) => ({
		isAuth   : auth.isAuth,
		isLoading: auth.isLoading,
		errors,
		user: auth.user,
	}),
	{signUp}
)(withRouter(SignUp));
