import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Timer from './Components/Timer/Timer';
import { withStyles } from "@material-ui/core/styles";
import ScrambleChip from "./Components/Timer/ScrambleChip";
import Scrambo from 'scrambo';

const styles = theme => ({
	main: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 11}px 0 ${theme.spacing.unit * 6}px`,
	},
	timerContainer: {
		padding: `${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 6}px`,
	},
	chip: {
		fontSize: "150%",
	},
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// The cube that is currently being scrambled/solved
			cube: '333',
			scramble: null,
		};
		this.worker = null;
		this.scrambler = new Scrambo();
	}

	componentDidMount() {
		this.worker = new Worker('/tnoodle.js');
		this.worker.window = window;
		this.beginScramble();
	}

	beginScramble = () => {
		const newScramble = this.scrambler.type(this.state.cube).get(1);
		this.setState({ scramble: newScramble });

	}

	updateCube = (newValue) => {
		this.setState({ cube: newValue });
		this.beginScramble();
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="App">
				<Navigation updateCube={this.updateCube} cube={this.state.cube} />
				<div className={classes.toolbar} />
				<main className={classes.main}>
					<ScrambleChip classes={classes} onClick={this.beginScramble} scramble={this.state.scramble || 'Scrambling...'} />
					<div className={classes.timerContainer}>
						<Timer></Timer>
					</div>
				</main>
			</div>
		)
	}
}

export default withStyles(styles)(App);
