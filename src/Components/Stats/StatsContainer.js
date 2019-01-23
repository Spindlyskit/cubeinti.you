import React, { Component } from 'react';
import TimeList from './TimeList';
import Averages from './Averages';
import TimeInfo from './TimeInfo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
	grid: {
		textAlign: 'center',
	},
};

class StatsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: [],
		};

		this.unsub = null;

		this.props.fb.on('signOut', () => {
			this.setState({ times: [] });
			this.unsub();
		});
	}

	addPenalty = (t, p) => {
		console.log(p);
		this.props.fb.addPenalty(t, p);
	};

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user && this.props.user !== null) {
			this.unsub = this.props.fb.db.collection(`users/${this.props.user.uid}/times`)
				.where('type', '==', '333')
				.where('subtype', '==', 'normal')
				.orderBy('created', 'desc')
				.onSnapshot(querySnapshot => {
					let newTimeList = [];
					querySnapshot.forEach(doc => {
						newTimeList.push(doc.data());
					});
					this.setState({ times: newTimeList });
				});
		}
	}

	render() {
		return (
			<div>
				<Grid container spacing={24}>
					<Grid item xs={6} className={this.props.classes.grid}>
						<TimeList times={this.state.times}/>
					</Grid>
					<Grid item xs={6} className={this.props.classes.grid}>
						<TimeInfo newestTime={this.state.times[0]} addPenalty={this.addPenalty}/>
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					<Grid item xs={12} className={this.props.classes.grid}>
						<Averages times={this.state.times}></Averages>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(StatsContainer);
