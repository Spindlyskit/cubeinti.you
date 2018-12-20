import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

function milliDisplay(s) {
	function pad(n) {
		n = n.toString();
		n = n.substr(0, 2);
		return `00${n}`.slice(-2);
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
			status: 'normal', // Can be: normal, willStart, didStop
		};
		this.timer = null;
	}

	keyDown = e => {
		if (e.keyCode !== 32) return;
		// If the timer is not started in normal then we'll begin to start it again
		if (!this.timer && this.state.status !== 'didStop') {
			this.setState({ status: 'willStart' });
			return;
		}
		// The timer can only stop from the normal state
		if (this.state.status !== 'normal') return;
		this.stop();
		this.props.beginScramble();
		this.setState({ status: 'didStop' });
	};

	keyUp = e => {
		if (e.keyCode !== 32 || this.timer) return;
		if (this.state.status === 'didStop') this.setState({ status: 'normal' });
		else if (this.state.status === 'willStart') this.start();
	};

	componentDidMount() {
		document.addEventListener('keydown', this.keyDown, false);
		document.addEventListener('keyup', this.keyUp, false);
	}

	componentWillUnmount() {
		if (this.timer) clearInterval(this.timer);
	}

	start() {
		this.setState({ status: 'normal' });
		this.setState({ lastTick: Date.now(), firstTick: Date.now() });
		this.timer = setInterval(() => this.tick(), 10);
	}

	stop() {
		clearInterval(this.timer);
		this.timer = null;
	}

	tick() {
		this.setState({ lastTick: Date.now() });
	}

	render() {
		const color = this.state.status === 'didStop' ? 'secondary' :
			this.state.status === 'willStart' ? 'primary' : 'textPrimary';
		return (
			<Typography variant="h1" color={color} align="center" component="h1">
				{this.state.lastTick ? milliDisplay(this.state.lastTick - this.state.firstTick) : '0.00'}
			</Typography>
		);
	}
}

export default Timer;
