function milliDisplay(s, p) {
	if (p === 1) {
		s += 2000;
	}
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

	let result = timestring.join(':');
	if (p === 1) {
		result = `${result}+`;
	} else if (p === 2) {
		result = `DNF (${result})`;
	}
	return result;
}

export default milliDisplay;
