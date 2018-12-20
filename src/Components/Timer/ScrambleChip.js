import React, { Component } from 'react';
import { Typography, Chip } from "@material-ui/core";

class ScrambleChip extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Typography component="h1" align="center" color="textPrimary" gutterBottom>
				<Chip label={this.props.scramble} onClick={this.props.onClick} className={classes.chip} />
			</Typography>
		);
	}
}

export default ScrambleChip;
