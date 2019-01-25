import React, { Component } from 'react';
import TimeCard from './TimeCard';
import Grid from '@material-ui/core/Grid';

class TimeList extends Component {
	render() {
		return (
			<div style={{ maxHeight: 200, overflowY: 'scroll', padding: 20 }}>
				<Grid container spacing={8}>
					{ this.props.times.map(time => // Div as dom element to contain click listener.
						<Grid item key={ time.created } xs={12} md={6} lg={4}>
							<div onClick={() => this.props.setSelected(time)}>
								<TimeCard time={ time } selected={this.props.selectedTime}/>
							</div>
						</Grid>
					) }
				</Grid>
			</div>
		);
	}
}

export default TimeList;
