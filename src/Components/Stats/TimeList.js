import React, { Component } from 'react';
import TimeCard from './TimeCard';

class TimeList extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.times);
	}

	render() {
		return (
			<div style={ { maxHeight: 200, overflowY: 'scroll' } }>
				{ this.props.times.map(time => <TimeCard key={ time.time } time={ time.time }/>) }
			</div>
		);
	}
}

export default TimeList;
