import React, { Component } from 'react';
import TimeList from './TimeList';
import Averages from './Averages';
import TimeInfo from './TimeInfo';
import Grid from '@material-ui/core/Grid';

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
			<Grid container spacing={16}>
				<Grid item xs={4}>
					<TimeList times={this.state.times}/>
				</Grid>
				<Grid item xs={4}>
					<TimeInfo newestTime={this.state.times[0]}/>
				</Grid>
				<Grid item xs={4}>
					<Averages times={this.state.times}></Averages>
				</Grid>
			</Grid>
		);
	}
}

export default StatsContainer;
