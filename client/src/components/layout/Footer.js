import React from 'react';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="ui container">
				<p className="text-center">&copy; {' '} {new Date().getFullYear()} {' '}
					<a href="https://academy.beetroot.se">Beetroot academy</a></p>
			</div>
		</footer>
	);
};

export default Footer;
