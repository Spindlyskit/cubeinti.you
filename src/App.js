import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Timer from './Components/Timer/Timer';
import { withStyles } from '@material-ui/core/styles';
import ScrambleChip from './Components/Timer/ScrambleChip';
import Scrambo from 'scrambo';
import Firebase, { FirebaseContext } from './Firebase';
import { UserContext } from './UserContext';

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
		this.firebase = new Firebase();
		this.token = null;
		this.firebase.updateUser = async result => {
			result = await result;
			console.log(result);
			this.setState({ user: result.user });
			this.token = result.credential.accessToken;
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
	};

	updateCube = newValue => {
		this.setState({ cube: newValue });
		this.beginScramble();
	};

	render() {
		const { classes } = this.props;
		return (
			<FirebaseContext.Provider value={this.firebase}>
				<UserContext.Provider value={{ user: this.state.user, token: this.token, firebase: this.firebase }}>
					<div className="App">
						<Navigation updateCube={this.updateCube} cube={this.state.cube} />
						<div className={classes.toolbar} />
						<main className={classes.main}>
							<ScrambleChip classes={classes} onClick={this.beginScramble}
								scramble={this.state.scramble || 'Scrambling...'} />
							<div className={classes.timerContainer}>
								<Timer beginScramble={this.beginScramble} />
							</div>
						</main>
					</div>
				</UserContext.Provider>
			</FirebaseContext.Provider>
		);
	}
}

export default withStyles(styles)(App);
