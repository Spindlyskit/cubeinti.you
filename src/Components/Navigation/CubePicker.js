import {MenuItem, Select} from "@material-ui/core";
import React from "react";

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
		<MenuItem value="444">4x4 Cube</MenuItem>
		<MenuItem value="555">5x5 Cube</MenuItem>
		<MenuItem value="skewb">Skewb</MenuItem>
	</Select>
}

export default CubePicker;
