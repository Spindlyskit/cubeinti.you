import { MenuItem, Select } from '@material-ui/core';
import React from 'react';

function SessionPicker(props) {
	const { classes } = props;
	// this array is id, displayName
	const sessions = {
		333: [['normal', 'Normal'], ['oh', 'One-handed'], ['bld', 'Blindfolded'], ['wf', 'With Feet']],
		444: [['normal', 'Normal'], ['bld', 'Blindfolded']],
		555: [['normal', 'Normal'], ['bld', 'Blindfolded']],
		666: [['normal', 'Normal'], ['bld', 'Blindfolded']],
		777: [['normal', 'Normal'], ['bld', 'Blindfolded']],
		skewb: [['normal', 'Normal']],
	}
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
			<MenuItem value={s[0]}>{ s[1] }</MenuItem>
		) }
	</Select>;
}

export default SessionPicker;
