import { MenuItem, Select } from '@material-ui/core';
import React from 'react';

function CubePicker(props) {
	const { classes } = props;
	return <Select
		value={props.cube}
		displayEmpty
		name="Cube"
		className={classes.select}
		onChange={e => props.updateCube(e.target.value)}
		inputProps={{
			classes: {
				icon: classes.icon,
			},
		}}
	>
		<MenuItem value="333">3x3 Cube</MenuItem>
		<MenuItem value="222">2x2 Cube</MenuItem>
		<MenuItem value="444">4x4 Cube</MenuItem>
		<MenuItem value="555">5x5 Cube</MenuItem>
		<MenuItem value="666">6x6 Cube</MenuItem>
		<MenuItem value="777">7x7 Cube</MenuItem>
		<MenuItem value="clock">Clock</MenuItem>
		<MenuItem value="minx">Megaminx</MenuItem>
		<MenuItem value="pyram">Pyraminx</MenuItem>
		<MenuItem value="skewb">Skewb</MenuItem>
		<MenuItem value="sq1">Square-1</MenuItem>
	</Select>;
}

export default CubePicker;
