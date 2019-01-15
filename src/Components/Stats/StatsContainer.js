import React, { Component } from 'react';
import TimeList from './TimeList';

class StatsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: [],
		};
		this.props.fb.on('signIn', () => { // User has been set in app
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
		});

		this.props.fb.on('signOut', () => {
			this.setState({ times: [] });
			this.unsub();
		});
	}

	render() {
		return (
			<div>
				<TimeList times={this.state.times}/>
			</div>
		);
	}
}

export default StatsContainer;
