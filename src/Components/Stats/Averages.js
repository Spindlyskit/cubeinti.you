import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';

const styles = {
	div: {
		margin: 50,
		padding: 20,
	},
};

class Averages extends Component {
	constructor(props) {
		super(props);
		this.requiredAverages = [5, 12, 50, 100];
		this.averages = null;
		this.genAverages();
	}

	genAverages() {
		this.averages = [];
		for (let l of this.requiredAverages) {
			if (this.props.times.length >= l) {
				this.averages.push(this.getAverage(this.props.times.slice(0, l)));
			} else {
				this.averages.push('N/A');
			}
		}
	}

	getAverage = timeList => {
		if (timeList[0] !== undefined) {
			let newTimeList = timeList;

			for (let t of newTimeList) {
				if (t.penalty === 1) t.time += 2000;
			}

			newTimeList.sort((a, b) => a.time - b.time);
			for (let i = 0; i < newTimeList.length; i++) {
				if (newTimeList[i].penalty === 2) {
					newTimeList.push(newTimeList.splice(i, i));
				}
			}

			let total = 0;

			// Cutoff calculated as described at
			// codegolf.stackexchange.com/questions/65806/calculate-the-average-and-standard-deviation-rubiks-cube-style;
			let cutoff;
			if (newTimeList.length < 5) {
				cutoff = 0;
			} else if (newTimeList.length < 12) {
				cutoff = 1;
			} else if (newTimeList.length < 40) {
				cutoff = Math.floor(newTimeList.length / 12); // If the length is 12, this is 1
			} else {
				cutoff = Math.floor(newTimeList.length / 20);
			}

			for (let i = cutoff; i < newTimeList.length - cutoff; i++) {
				if (newTimeList[i].penalty !== 2) {
					total += newTimeList[i].time;
				} else {
					return 'DNF';
				}
			}

			return Math.round(total / (newTimeList.length - (cutoff * 2)));
		}
		return 0;
	};

	render() {
		this.genAverages();
		return (
			<div className={this.props.classes.div}>
				<Typography variant="h5" gutterBottom>
					<Grid container spacing={24}>
						{ this.averages.map((v, i) =>
							<Grid item key={ i } xs={3}>
								Ao{ this.requiredAverages[i] } : { typeof v === 'number' ? milliDisplay(v) : v }
							</Grid>
						)}
					</Grid>
				</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(Averages);
