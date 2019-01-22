import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';
import Divider from '@material-ui/core/Divider';

const styles = {
	paper: {
		'min-height': '100%',
		padding: 20,
	},
};

class TimeInfo extends Component {
	render() {
		let time = this.props.newestTime !== undefined;
		return (
			<Paper className={ this.props.classes.paper }>
				<Typography variant="h5" gutterBottom>
					{ time ? milliDisplay(this.props.newestTime.time) : '' }
					<Divider />
					Scramble: { time ? this.props.newestTime.scramble : '' }
				</Typography>
			</Paper>
		);
	}
}

export default withStyles(styles)(TimeInfo);
