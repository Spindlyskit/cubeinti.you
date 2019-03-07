import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class SetSeedButton extends React.Component {
	state = {
		open: false,
		seed: '',
	};

	handleClickOpen = () => {
		this.setState({ open: true });
		this.props.updateCanTime(false);
		setTimeout(() => this.myTextField.focus(), 100);
	};

	handleClose = (e, r) => {
		this.setState({ open: false });
		this.props.updateCanTime(true);
		// Only set seed if the button was acutally fixed
		if (!r) this.props.setSeed(this.state.seed);
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleClickOpen}>Set Seed</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Set Scramble Seed</DialogTitle>
					<DialogContent>
						<TextField
							id="standard-bare"
							defaultValue=""
							margin="normal"
							autocomplete="false"
							autofocus
							onChange={e => { this.setState({ seed: e.target.value }); }}
							inputRef={el => { this.myTextField = el; }}
							onClick={() => { this.myTextField.focus(); }}/>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={this.handleClose}>
							Set
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default SetSeedButton;
