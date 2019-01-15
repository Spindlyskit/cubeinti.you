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
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 11}px 0 ${theme.spacing.unit * 6}px`,
	},
	timerContainer: {
		padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`,
	},
	chip: {
		fontSize: '150%',
	},
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// The cube that is currently being scrambled/solved
			cube: '333',
			scramble: null,
			user: null,
		};
		this.fb = new Firebase();
		this.token = null;

		this.fb.on('signIn', result => {
			this.setState({ user: result.user });
			this.token = result.credential.accessToken;
		});
		this.fb.on('signOut', () => {
			this.setState({ user: null });
			this.token = null;
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
		const newScramble = this.scrambler.type(this.state.cube).get(1);
		this.setState({ scramble: newScramble });
	};

	updateCube = newValue => {
		this.setState({ cube: newValue });
		this.beginScramble();
	};

	addTime = time => {
		this.fb.addTime(this.state.user.uid, {
			time: time,
			type: this.state.cube,
			subtype: 'normal',
			scramble: this.state.scramble[0],
			penalty: 0,
			created: +Date.now(),
			archived: false,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="App">
				<Navigation updateCube={this.updateCube} cube={this.state.cube} user={this.state.user} fb={this.fb} />
				<div className={classes.toolbar} />
				<main className={classes.main}>
					<ScrambleChip classes={classes} onClick={this.beginScramble}
						scramble={this.state.scramble || 'Scrambling...'} />
					<div className={classes.timerContainer}>
						<Timer beginScramble={this.beginScramble} scramble={this.state.scramble}
							cube={this.state.cube} user={this.state.user} fb={this.fb} />
					</div>
					<StatsContainer user={this.state.user} fb={this.fb} />
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(App);
