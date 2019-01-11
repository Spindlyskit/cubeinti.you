import { Button } from '@material-ui/core';
import React from 'react';

function LoginButton(props) {
	return (
		<Button onClick={() => props.fb.signInPopup()} color="inherit">Login</Button>
	);
}

export default LoginButton;
