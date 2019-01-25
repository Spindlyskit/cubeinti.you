import React, { Component } from 'react';
import TimeList from './TimeList';
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
			selected: {},
		};

		this.unsub = null;

		this.props.fb.on('signOut', () => {
			this.setState({ times: [], selected: {} });
			this.unsub();
		});
	}

	addPenalty = (t, p) => {
		this.props.fb.addPenalty(t, p);
	};

	deleteTime = t => {
		this.props.fb.deleteTime(t);
	};

	setSelected = t => {
		this.setState({ selected: t });
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

					if (newTimeList[0] !== this.state.times[0]) {
						this.setState({ selected: newTimeList[0] });
					}
					this.setState({ times: newTimeList });
				});
		}
	}

	render() {
		return (
			<div>
				{ this.state.times[0] !== undefined ?
					<Grid container spacing={24}>
						<Grid item xs={6} className={this.props.classes.grid}>
							<TimeList times={this.state.times} selectedTime={this.state.selected}
								setSelected={this.setSelected}/>
						</Grid>
						<Grid item xs={6} className={this.props.classes.grid}>
							<TimeInfo times={this.state.times} selectedTime={this.state.selected}
								addPenalty={this.addPenalty} deleteTime={this.deleteTime}/>
						</Grid>
					</Grid> :
					null
				}
			</div>
		);
	}
}

export default withStyles(styles)(StatsContainer);
