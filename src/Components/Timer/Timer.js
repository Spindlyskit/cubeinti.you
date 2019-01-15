import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import milliDisplay from '../../Util/milliDisplay';

const styles = {
	green: {
		color: '#76FF03',
	},
	red: {
		color: '#F44336',
	},
	black: {
		color: '#000',
	},
};


class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastTick: null,
			firstTick: null,
			status: 'normal', // Can be: normal, willStart, didStop
		};
		this.timer = null;
		this.fb = null;
		this.uc = null;
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

		if (this.props.user !== null) {
			this.props.fb.addTime({
				time: this.state.lastTick - this.state.firstTick,
				type: this.props.cube,
				subtype: 'normal',
				scramble: this.props.scramble[0],
				penalty: 0,
				created: +Date.now(),
				archived: false,
			});
		}
	}

	tick() {
		this.setState({ lastTick: Date.now() });
	}

	render() {
		const className = this.state.status === 'didStop' ? 'red' :
			this.state.status === 'willStart' ? 'green' : 'black';
		return (
			<Typography variant="h1" className={this.props.classes[className]} align="center" component="h1">
				{
					this.state.lastTick ? milliDisplay(this.state.lastTick - this.state.firstTick) : '0.00'
				}
			</Typography>
		);
	}
}

export default withStyles(styles)(Timer);

