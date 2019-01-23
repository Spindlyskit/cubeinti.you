import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';
import Divider from '@material-ui/core/Divider';
import Averages from './Averages';

const styles = {
	divider: {
		margin: 10,
	},
	button: {
		'margin-left': '2%',
		'margin-right': '2%',
	},
	deleteButton: {
		float: 'right',
		'margin-right': '7%',
	},
	buttonContainer: {
		'text-align': 'left',
		'padding-left': '5%',
	},
};

class TimeInfo extends Component {
	render() {
		let time = this.props.times[0] !== undefined;
		let penalty;
		if (time) {
			penalty = this.props.times[0].penalty;
		}
		return (
			<Typography variant="h5" gutterBottom>
				{ time ? milliDisplay(this.props.times[0].time, this.props.times[0].penalty) : '' }
				<Divider className={this.props.classes.divider}/>
				Scramble: { time ? this.props.times[0].scramble : '' }
				<Divider className={this.props.classes.divider}/>
				<div className={this.props.classes.buttonContainer}>
					<Button variant="contained" color={penalty === 0 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.times[0], 0)}>
						No Penalty
					</Button>
					<Button variant="contained" color={penalty === 1 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.times[0], 1)}>
						+2
					</Button>
					<Button variant="contained" color={penalty === 2 ? 'primary' : 'default'}
						className={this.props.classes.button}
						onClick={() => this.props.addPenalty(this.props.times[0], 2)}>
						DNF
					</Button>
					<Button variant="contained" color='secondary'
						className={this.props.classes.deleteButton}
						onClick={() => this.props.deleteTime(this.props.times[0])}>
						Delete
					</Button>
				</div>
				<Divider className={this.props.classes.divider}/>
				<Averages times={this.props.times} />
			</Typography>
		);
	}
}

export default withStyles(styles)(TimeInfo);
