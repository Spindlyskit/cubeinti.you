import React, { Component } from 'react';
import { Typography, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	chipContainer: {
		maxWidth: '70%',
		maxHeight: 100,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	chip: {
		height: '100%',
		padding: '0.5%',
	},
	label: {
		maxWidth: '100%',
		whiteSpace: 'normal',
		'word-wrap': 'break-word',
		'overflow-wrap': 'break-word',
	}
}

class ScrambleChip extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Typography align="center" color="textPrimary" noWrap={false} className={classes.chipContainer} gutterBottom>
				<Chip label={this.props.scramble} onClick={this.props.onClick} classes={{label: classes.label}} className={classes.chip} />
			</Typography>
		);
	}
}

export default withStyles(styles)(ScrambleChip);
