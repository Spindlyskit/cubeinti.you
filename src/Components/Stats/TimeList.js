import React, { Component } from 'react';
import TimeCard from './TimeCard';
import Grid from '@material-ui/core/Grid';

class TimeList extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.times);
	}

	render() {
		return (
			<div style={{ maxHeight: 200, overflowY: 'scroll', padding: 20 }}>
				<Grid container spacing={8}>
					{ this.props.times.map(time => <TimeCard key={ time.time } time={ time.time }/>) }
				</Grid>
			</div>
		);
	}
}

export default TimeList;
