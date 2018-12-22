import { Button } from '@material-ui/core';
import { FirebaseContext } from '../../Firebase';
import React from 'react';

function LoginButton() {
	return (
		<FirebaseContext.Consumer>
			{firebase =>
				<Button onClick={() => firebase.signInPopup()} color="inherit">Login</Button>
			}
		</FirebaseContext.Consumer>
	);
}

export default LoginButton;
