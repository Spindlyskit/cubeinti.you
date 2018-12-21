import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { UserContext } from '../../UserContext';
import CubePicker from './CubePicker';
import LoginButton from './LoginButton';
import UserDisplay from './UserDisplay';

// Custom styles for right align and select coloration.
const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	select: {
		'&:before': {
			borderColor: '#fff',
		},
		'&:after': {
			borderColor: '#fff',
		},
		color: '#fff',
	},
	icon: {
		fill: '#fff',
	},
};

function Navigation(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						<CubePicker classes={classes} cube={props.cube} updateCube={props.updateCube} />
					</Typography>
					<UserContext.Consumer>
						{({ user }) =>
							user ? <UserDisplay user={user} /> : <LoginButton />
						}
					</UserContext.Consumer>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withStyles(styles)(Navigation);
