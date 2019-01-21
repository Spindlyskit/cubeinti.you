import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';

const styles = {
	paper: {
		'min-height': '100%',
		padding: 20,
	},
};

class Averages extends Component {
	constructor(props) {
		super(props);
		this.requiredAverages = [5, 12]
		this.averages = null;
		this.genAverages();
	}
	
	genAverages() {
		this.averages = [];
		for (let l of this.requiredAverages) {
			this.averages.push(this.smallAverage(this.props.times.slice(0, l)));
		}
	}
	
	smallAverage = timeList => { // Eg ao5 and ao12 -> max and min are subtracted
		if (timeList[0] != null) {
			let total = 0;
			for (let t of timeList) {
				total += t.time;
			}
			// Subtract max and min values
			total -= timeList.reduce((max, t) => max && max.time > t.time ? max : t, null).time;
			total -= timeList.reduce((min, t) => min && min.time < t.time ? min : t, null).time;

			return total / (timeList.length - 2);
		}
		return 0;
	};
	
	// TODO: add largeAverage which discounts top and bottom 10%
	
	render() {
		this.genAverages();
		return (
			<Paper className={ this.props.classes.paper }>
				<Typography variant="h5" gutterBottom>
					{ this.averages.map((v, i) => {
					return <div key={ i }>
						Average of { this.requiredAverages[i] } : { milliDisplay(v) }
					</div>})
					}
				</Typography>
			</Paper>
		);
	}
}

export default withStyles(styles)(Averages);
