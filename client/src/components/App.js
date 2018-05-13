import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import '../index.css'

import Nav from './layout/Nav';
import Home from './pages/Home';
import Dashboard from './dashboard';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Footer from './layout/Footer';
import page404 from './pages/page404';

class App extends Component {


	render() {
		return (
			<div className="container-fluid wrap">
				<Nav />
				<div className="wrap-center  py-3">
					<Switch>
						<Route exact
						       path="/"
						       component={Home} />
						<Route path="/dashboard"
						       component={Dashboard} />
						<Route path="/sign-in"
						       component={SignIn} />
						<Route path="/sign-up"
						       component={SignUp} />
						<Route component={page404} />
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
