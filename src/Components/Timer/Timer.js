import React, { Component } from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";

function milliDisplay(s) {
	function pad(n) {
		n = n.toString();
		n = n.substr(0, 2);
		return ('00' + n).slice(-2);
	}

	const ms = s % 1000;
	s = (s - ms) / 1000;
	const secs = s % 60;
	s = (s - secs) / 60;
	const mins = s % 60;
	const hrs = (s - mins) / 60;

	let timestring = [];

	if (hrs > 0) timestring.push(pad(hrs));
	if (mins > 0) timestring.push(pad(mins));
	timestring.push(`${mins > 0 ? pad(secs) : secs}.${pad(Math.floor(ms / 10))}`);

	return timestring.join(':');
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
		this.setState({ lastTick: Date.now(), firstTick: Date.now() });
		setInterval(() => this.tick(), 10)
	}

	tick() {
		this.setState({ lastTick: Date.now() });
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
