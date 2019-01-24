function milliDisplay(s) {
	function pad(n) {
		n = n.toString();
		n = n.substr(0, 2);
		return `00${n}`.slice(-2);
	}

	const ms = s % 1000;
	s = (s - ms) / 1000;
	const secs = s % 60;
	s = (s - secs) / 60;
	const mins = s % 60;
	const hrs = (s - mins) / 60;

	let timestring = [];

	if (hrs > 0) timestring.push(pad(hrs));
	if (mins > 0) timestring.push(pad(mins));
	timestring.push(`${mins > 0 ? pad(secs) : secs}.${pad(Math.floor(ms / 10))}`);

	return timestring.join(':');
}

export default milliDisplay;
