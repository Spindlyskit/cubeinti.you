import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

class SessionManager extends React.Component {
	state = {
		open: false,
		selectedIndex: 0,
		newSessionName: '',
	};

	handleClickOpen = () => {
		this.setState({ open: true });
		this.props.updateCanTime(false);
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.updateCanTime(true);

		this.props.updateSession(this.props.sessionList[this.props.cube][this.state.selectedIndex]);
	};

	handleListItemClick = (e, i) => {
		this.setState({ selectedIndex: i });
	};

	handleAddSessionKeyPress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.props.addSession(this.state.newSessionName);
			this.myTextField.value = '';
		}
	};

	removeSession = (item, index) => {
		this.props.removeSession(item);
		const selectedIndex = this.state.selectedIndex;
		if (this.state.selectedIndex === index) {
			this.setState({ selectedIndex: 0 },
				() => this.props.updateSession(this.props.sessionList[this.props.cube][this.state.selectedIndex]));
		} else if (index < this.state.selectedIndex) {
			this.setState({ selectedIndex: selectedIndex - 1 },
				() => this.props.updateSession(this.props.sessionList[this.props.cube][this.state.selectedIndex]));
		}
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleClickOpen} color="inherit">Manage Sessions</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Session manager</DialogTitle>
					<DialogContent>
						<List>
							{this.props.sessionList[this.props.cube].map((item, index) =>
								<ListItem key={index} selected={this.state.selectedIndex === index}
									button onClick={e => this.handleListItemClick(e, index)} >
									<ListItemText primary={item}/>
									<ListItemSecondaryAction>
										<IconButton aria-label="Delete" onClick={() => this.removeSession(item, index)}>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)}
						</List>
						<TextField
							id="standard-bare"
							defaultValue=""
							label="Add Session"
							margin="normal"
							autoComplete="false"
							autoFocus
							onChange={e => { this.setState({ newSessionName: e.target.value }); }}
							onKeyPress={this.handleAddSessionKeyPress}
							inputRef={el => { this.myTextField = el; }}
							onClick={() => { this.myTextField.focus(); }}/>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleClose}>
							Done
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default SessionManager;
