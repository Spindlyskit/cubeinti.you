import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
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
};

function TimeCard(props) {
	const { classes } = props;

	return (
		<Grid item xs={12} md={6} lg={4}>
			<Paper className={classes.paper}>
				<Typography variant="h5"
				className={[classes.title, props.time.penalty === 2 ? classes.dnf : null]}
					color="textPrimary" align="center" component="h5">
					{ milliDisplay(props.time.time) }{ props.time.penalty === 1 ? '+' : '' }
				</Typography>
			</Paper>
		</Grid>
	);
}

export default withStyles(styles)(TimeCard);
