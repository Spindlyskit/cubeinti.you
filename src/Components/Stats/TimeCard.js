import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import milliDisplay from '../../Util/milliDisplay';

const styles = {
	paper: {
		'padding-top': 20,
		'padding-bottom': 20,
	},
	dnf: {
		'text-decoration': 'line-through',
	},
	selected: {
		backgroundColor: '#F5F5F5',
	},
};

function TimeCard(props) {
	const { classes } = props;

	return (
		<Paper className={`${classes.paper} ${props.selected === props.time ? classes.selected : null}`}>
			<Typography variant="h5"
				className={`${classes.title} ${props.time.penalty === 2 ? classes.dnf : null}`}
				color="textPrimary" align="center" component="h5">
				{props.time.penalty === 1 ?
					parseFloat(milliDisplay(props.time.time)) + 2 : milliDisplay(props.time.time)}
				{props.time.penalty === 1 ? '+' : ''}
			</Typography>
		</Paper>
	);
}

export default withStyles(styles)(TimeCard);
