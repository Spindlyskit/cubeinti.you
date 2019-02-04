import { MenuItem, Select } from '@material-ui/core';
import React from 'react';

function SessionPicker(props) {
	const { classes } = props;
	// This array is id, displayName
	const sessions = {
		333: [['normal', 'Normal'], ['oh', 'One-handed'], ['bld', 'Blindfolded'], ['wf', 'With Feet'], ['ext', 'extra']],
		222: [['normal', 'Normal'], ['ext', 'extra']],
		444: [['normal', 'Normal'], ['bld', 'Blindfolded'], ['ext', 'extra']],
		555: [['normal', 'Normal'], ['bld', 'Blindfolded'], ['ext', 'extra']],
		666: [['normal', 'Normal'], ['ext', 'extra']],
		777: [['normal', 'Normal'], ['ext', 'extra']],
		clock: [['normal', 'Normal'], ['ext', 'extra']],
		minx: [['normal', 'Normal'], ['ext', 'extra']],
		pyram: [['normal', 'Normal'], ['ext', 'extra']],
		sq1: [['normal', 'Normal'], ['ext', 'extra']],
		skewb: [['normal', 'Normal'], ['ext', 'extra']],
	};
	return <Select
		value={props.session}
		displayEmpty
		name="Type"
		className={classes.select}
		onChange={e => props.updateSession(e.target.value)}
		inputProps={{
			classes: {
				icon: classes.icon,
			},
		}}
	>
		{ sessions[props.cube].map(s => // Div as dom element to contain click listener.
			<MenuItem key={s[0]} value={s[0]}>{ s[1] }</MenuItem>
		) }
	</Select>;
}

export default SessionPicker;
