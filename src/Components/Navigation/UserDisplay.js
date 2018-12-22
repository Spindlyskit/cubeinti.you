import React, { Component } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

class UserDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
		};
	}

	handleChange = event => {
		this.setState({ auth: event.target.checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		return (
			<div>
				<Button
					aria-owns={this.state.isMenuOpen ? 'material-appbar' : undefined}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit"
				>
					{this.props.user.displayName}
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={this.state.anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.props.firebase.signOut}>Logout</MenuItem>
					<MenuItem onClick={this.handleClose}>My account</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default UserDisplay;
