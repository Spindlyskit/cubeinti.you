import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';
import Divider from '@material-ui/core/Divider';

const styles = {
	paper: {
		'min-height': '100%',
		padding: 20,
	},
	divider: {
		margin: 10,
	},
};

class TimeInfo extends Component {
	render() {
		let time = this.props.newestTime !== undefined;
		let penalty;
		if (time) {
			penalty = this.props.newestTime.penalty;
		}
		return (
			<Paper className={ this.props.classes.paper }>
				<Typography variant="h5" gutterBottom>
					{ time ? milliDisplay(this.props.newestTime.time, this.props.newestTime.penalty) : '' }
					<Divider className={this.props.classes.divider}/>
					Scramble: { time ? this.props.newestTime.scramble : '' }
					<Divider className={this.props.classes.divider}/>
					<Button variant="contained" color={penalty === 0 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.newestTime, 0)}>
						No Penalty
					</Button>
					<Button variant="contained" color={penalty === 1 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.newestTime, 1)}>
						+2
					</Button>
					<Button variant="contained" color={penalty === 2 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.newestTime, 2)}>
						DNF
					</Button>
				</Typography>
			</Paper>
		);
	}
}

export default withStyles(styles)(TimeInfo);
