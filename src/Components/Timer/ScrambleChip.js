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
		fontSize: '150%',
	},
	label: {
		maxWidth: '100%',
		whiteSpace: 'normal',
		'word-wrap': 'break-word',
		'overflow-wrap': 'break-word',
	},
};

class ScrambleChip extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Typography component={'div'} align="center" color="textPrimary" noWrap={false} className={classes.chipContainer}>
				<Chip label={this.props.scramble[0].scramble_string} onClick={this.props.onClick}
					classes={{ label: classes.label }} className={classes.chip} />
			</Typography>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ScrambleChip);
