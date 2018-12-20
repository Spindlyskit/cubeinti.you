import React, { Component } from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

function milliDisplay(time) {
	let milliseconds = parseInt((time%1000)/10)
		, seconds = parseInt((time/1000)%60)
		, minutes = parseInt((time/(1000*60))%60)
		, hours = parseInt((time/(1000*60*60))%24);

	hours = (hours < 10) ? '0' + hours : hours;
	minutes = (minutes < 10) ? '0' + minutes : minutes;

	milliseconds = milliseconds.toString();
	while (milliseconds.length < 2) milliseconds += '0';

	console.log(hours);
	console.log(minutes);
	console.log(seconds);

	return `
	${hours === '00' ? '' : `${hours}:`
	}${minutes === '00' ? '' : `${minutes}:`
	}${seconds
	}.${milliseconds}
	`;
}

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastTick: null,
			firstTick: null,
		};
	}

	componentDidMount() {
		this.start();
	}

	start() {
		this.setState({ lastTick: +new Date(), firstTick: +new Date() });
		setTimeout(() => this.tick(), 10)
	}

	tick() {
		this.setState({ lastTick: +new Date() });
		setTimeout(() => this.tick(), 10)
	}

	render() {
		return (
			<Card>
				<CardContent>
					<Typography variant="h1" align="center" component="h1">
						{this.state.lastTick ? milliDisplay(this.state.lastTick - this.state.firstTick) : '0.00'}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default Timer;
