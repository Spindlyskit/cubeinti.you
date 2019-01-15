import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import milliDisplay from '../../Util/milliDisplay';

const styles = {
	card: {
		width: 150,
		margin: 8,
		display: 'inline-block',
	},
};

function TimeCard(props) {
	const { classes } = props;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" className={classes.title}
					color="textPrimary" align="center" component="h5">
					{ milliDisplay(props.time) }
				</Typography>
			</CardContent>
		</Card>
	);
}

export default withStyles(styles)(TimeCard);
