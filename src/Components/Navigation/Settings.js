import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
	icon: {
		color: theme.palette.primary.contrastText,
	},
});

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSwitchChange = name => event => {
		this.props.updateSetting({ [name]: event.target.checked });
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleClickOpen}>
					<SettingsIcon className={this.props.classes.icon}/>
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Settings</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Dark Theme:
							<Switch
								checked={this.props.settings.darkTheme}
								onChange={this.handleSwitchChange('darkTheme')}
								value="theme"/>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Done
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Settings);
