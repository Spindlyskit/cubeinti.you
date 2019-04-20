import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Timer from './Components/Timer/Timer';
import ScrambleChip from './Components/Timer/ScrambleChip';
import StatsContainer from './Components/Stats/StatsContainer';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';
import { Scrambow } from 'scrambow';
import Firebase from './Firebase';
import SetSeedButton from './Components/Timer/SetSeedButton';

const styles = theme => ({
	main: {
		maxWidth: '90%',
		margin: '0 auto',
		padding: `${theme.spacing.unit * 11}px 0 ${theme.spacing.unit * 6}px`,
		textAlign: 'center',
	},
	timerContainer: {
		padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`,
		minHeight: 200,
	},
	setSeedButtonContainer: {
		display: 'inline-block',
	},
});

const scrambleLengths = {
	444: 40,
	555: 60,
	666: 80,
	777: 100,
	minx: 70,
};
const themes = {
	light: createMuiTheme({
		typography: {
			useNextVariants: true,
		},
		palette: {
			secondary: red,
		},
	}),
	dark: createMuiTheme({
		palette: {
			type: 'dark',
			secondary: red,
		},
		typography: {
			useNextVariants: true,
		},
	}),
};

const pageTitle = 'Cube in Time';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// The cube that is currently being scrambled/solved
			cube: '333',
			session: 'Normal (log in for more)',
			scramble: null,
			user: null,
			canTime: true,
			settings: {
				darkTheme: false,
			},
			sessionList: {
				333: ['Normal (log in for more)'],
			},
		};

		this.fb = new Firebase();

		this.fb.on('signIn', u => {
			this.setState({ user: u });
			document.title = `${pageTitle} | ${u.displayName}`;
		});
		this.fb.on('signOut', () => {
			this.setState({ user: null });
			document.title = pageTitle;
		});
		this.fb.on('settingsChange', s => {
			this.setState({ settings: s });
		});
		this.fb.on('sessionListChange', s => {
			this.setState({ sessionList: s });
			this.updateSession(s[this.state.cube][0]);
		});

		this.worker = null;
		this.scrambler = new Scrambow().setSeed(new Date().getTime());
	}

	componentDidMount() {
		this.beginScramble();
	}

	beginScramble = () => {
		this.scrambler.setType(this.state.cube);

		if (scrambleLengths[this.state.cube !== null]) {
			this.scrambler.setLength(scrambleLengths[this.state.cube]);
		}

		const newScramble = this.scrambler.get();
		this.setState({ scramble: newScramble });
	};

	updateCube = newValue => {
		this.setState({ cube: newValue, session: 'normal' }, this.beginScramble);
	};

	updateSession = newValue => {
		this.setState({ session: newValue });
	};

	addSession = name => {
		if (!this.state.sessionList[this.state.cube].includes(name)) {
			let newSessionList = { ...this.state.sessionList };
			newSessionList[this.state.cube] = [...newSessionList[this.state.cube], name];
			this.setState({ sessionList: newSessionList }, () => this.fb.addSession(this.state.sessionList));
		}
	};

	removeSession = name => {
		let newSessionList = this.state.sessionList;
		let index = newSessionList[this.state.cube].indexOf(name);
		newSessionList[this.state.cube].splice(index, 1);
		this.setState({ sessionList: newSessionList },
			() => this.fb.removeSession(this.state.sessionList, this.state.cube, name));
		if (this.state.session === name) {
			this.setState({ session: this.state.sessionList[this.state.cube][0] });
		}
	};

	updateSetting = newSetting => {
		this.setState({ settings: { ...this.state.settings, ...newSetting } });
		this.fb.updateSettings(newSetting);
	};

	updateCanTime = e => {
		this.setState({ canTime: e });
	};

	setSeed = s => {
		if (s !== null) {
			this.scrambler.setSeed(s);
			this.beginScramble();
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={this.state.settings.darkTheme ? themes.dark : themes.light}>
				<CssBaseline />
				<div className="App">
					<Navigation user={this.state.user} fb={this.fb}
						updateCube={this.updateCube} cube={this.state.cube}
						updateSession={this.updateSession} session={this.state.session}
						addSession={this.addSession} removeSession={this.removeSession}
						updateSessionList={this.updateSessionList} sessionList={this.state.sessionList}
						updateSetting={this.updateSetting} settings={this.state.settings}
						updateCanTime={this.updateCanTime}/>
					<div className={classes.toolbar} />
					<main className={classes.main}>
						<ScrambleChip onClick={this.beginScramble} setSeed={this.setSeed}
							scramble={this.state.scramble || 'Scrambling...'} />
						<div className={classes.setSeedButtonContainer}>
							<SetSeedButton updateCanTime={this.updateCanTime} setSeed={this.setSeed}/>
						</div>
						<div className={classes.timerContainer}>
							<Timer beginScramble={this.beginScramble} scramble={this.state.scramble}
								cube={this.state.cube} session={this.state.session}
								user={this.state.user} fb={this.fb} canTime={this.state.canTime} />
						</div>
						<StatsContainer user={this.state.user} fb={this.fb}
							cube={this.state.cube} session={this.state.session} />
					</main>
					<Typography variant="caption" align="center" gutterBottom>
						Cubeintime uses Google and Firebase for authentication and data
						storage - these are the only third parties your data will be shared with.
						<br/>
						<a href="https://policies.google.com/technologies/partner-sites?hl=en-GB&gl=uk">
							See how Google processes your data
						</a>
						<br/>
						<a href="https://firebase.google.com/support/privacy/#data_processing_information">
							See how Firebase processes your data
						</a>
					</Typography>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
