import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Timer from './Components/Timer/Timer';
import { withStyles } from '@material-ui/core/styles';
import ScrambleChip from './Components/Timer/ScrambleChip';
import StatsContainer from './Components/Stats/StatsContainer';
import Scrambo from 'scrambo';
import Firebase from './Firebase';

const styles = theme => ({
	main: {
		maxWidth: '90%',
		margin: '0 auto',
		padding: `${theme.spacing.unit * 11}px 0 ${theme.spacing.unit * 6}px`,
	},
	timerContainer: {
		padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`,
		minHeight: 200,
	},
	chip: {
		fontSize: '150%',
	},
});

const scrambleLengths = {
	333: 25,
	444: 40,
	555: 60,
	666: 80,
	777: 100,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// The cube that is currently being scrambled/solved
			cube: '333',
			session: 'normal',
			scramble: null,
			user: null,
		};
		this.fb = new Firebase();

		this.fb.on('signIn', u => {
			this.setState({ user: u });
		});
		this.fb.on('signOut', () => {
			this.setState({ user: null });
		});

		this.worker = null;
		this.scrambler = new Scrambo();
	}

	componentDidMount() {
		this.worker = new Worker('/tnoodle.js');
		this.worker.window = window;
		this.beginScramble();
	}

	beginScramble = () => {
		const newScramble = this.scrambler.type(this.state.cube)
			.length(scrambleLengths[this.state.cube])
			.seed(new Date().getTime())
			.get();
		this.setState({ scramble: newScramble });
	};

	updateCube = newValue => {
		this.setState({ cube: newValue, session: 'normal' }, this.beginScramble);
	};
	updateSession = newValue => {
		this.setState({ session: newValue });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="App">
				<Navigation user={this.state.user} fb={this.fb}
					updateCube={this.updateCube} cube={this.state.cube}
					updateSession={this.updateSession} session={this.state.session} />
				<div className={classes.toolbar} />
				<main className={classes.main}>
					<ScrambleChip classes={classes} onClick={this.beginScramble}
						scramble={this.state.scramble || 'Scrambling...'} />
					<div className={classes.timerContainer}>
						<Timer beginScramble={this.beginScramble} scramble={this.state.scramble}
							cube={this.state.cube} session={this.state.session}
							user={this.state.user} fb={this.fb} />
					</div>
					<StatsContainer user={this.state.user} fb={this.fb}
					cube={this.state.cube} session={this.state.session} />
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(App);
