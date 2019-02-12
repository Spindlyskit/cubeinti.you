import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CubePicker from './CubePicker';
import SessionPicker from './SessionPicker';
import LoginButton from './LoginButton';
import UserDisplay from './UserDisplay';
import Settings from './Settings';

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
						<CubePicker classes={classes} cube={props.cube}
							updateCube={props.updateCube} />
						<SessionPicker classes={classes} cube={props.cube}
							session={props.session} updateSession={props.updateSession} />
					</Typography>
					{
						props.user ? <UserDisplay user={props.user} fb={props.fb} /> : <LoginButton fb={props.fb}/>
					}
					{
						props.user ? <Settings settings={props.settings} updateSetting={props.updateSetting}/> : null
					}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(Navigation);
