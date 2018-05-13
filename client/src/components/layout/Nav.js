import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Menu, Icon, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {signOut} from '../../AC/auth';

const Nav = ({isAuth, user, signOut}) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Menu className="navbar-nav">
				<Menu.Item className="nav-item">
					<NavLink exact
					         to="/"
					         activeClassName="active"
					         className="navbar-brand navbar-logo">
						<img src="/assets/img/logo.svg" />
					</NavLink>
				</Menu.Item>
				{
					isAuth &&
					<Menu.Item className="nav-item">
						<NavLink to="/dashboard"
						         className="nav-link">Dashboard</NavLink>
					</Menu.Item>
				}

				{
					isAuth
						? <Menu.Menu position="right"
						             className="navbar-nav">
							<Menu.Item className="nav-item ">
								<Image avatar
								       src={user.avatar}
								       alt={user.name}
								       size="mini" />
							</Menu.Item>
							<Menu.Item className="nav-item ">
								<Button animated
								        basic
								        color="blue"
								        onClick={signOut}>
									<Button.Content visible><p>Sign Out</p></Button.Content>
									<Button.Content hidden>
										<p><Icon name="sign out"
										         size="large" />
										</p>
									</Button.Content>
								</Button>
							</Menu.Item>
						</Menu.Menu>
						: <Menu.Menu position="right"
						             className="navbar-nav">
							<Menu.Item className="nav-item ">
								<Button animated
								        color="green">
									<Button.Content visible>
										<NavLink to="/sign-in"
										         className="nav-link">Sign In</NavLink>
									</Button.Content>
									<Button.Content hidden>
										<NavLink to="/sign-in"
										         className="nav-link">
											<Icon name="sign in"
											      size="large" />
										</NavLink>
									</Button.Content>
								</Button>
							</Menu.Item>
							<Menu.Item className="nav-item ">
								<Button animated
								        basic
								        color="purple">
									<Button.Content visible>
										<NavLink to="/sign-up"
										         className="nav-link">Sign Up</NavLink>
									</Button.Content>
									<Button.Content hidden
									                purple>
										<NavLink to="/sign-up"
										         className="nav-link">
											<Icon name="add user"
											      size="large" />
										</NavLink>
									</Button.Content>
								</Button>
							</Menu.Item>
						</Menu.Menu>
				}
			</Menu>
		</nav>
	);
};

Nav.propTypes = {
	isAuth: PropTypes.bool.isRequired
};

Nav.defaultProps = {
	isAuth: false
};


export default connect(
	({auth}) => ({
		isAuth: auth.isAuth,
		user  : auth.user
	}),
	{signOut}
)(Nav);
