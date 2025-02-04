import React, {useState, useEffect} from 'react';

function TimerApp() {

	const [time, setTime] = useState(0);
	const [isRunniung, setIsRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (isRunniung) {
			interval = setInterval(() => {
				setTime((prevState) => prevState + 1);
			}, 500);
		}
		return () => clearInterval(interval);
	}, [isRunniung]);

	function handleStart() {
		setIsRunning(true);
	}

	function handlePause() {
		setIsRunning(false)
	}

	function handleReset() {
		setTime(0);
	}

	return(<div style={{border : "1px solid white", padding : "10px", borderRadius : "15px"}}>
	<h1 style={{textAlign : "center"}}>Timer App</h1>
	<h1 style={{textAlign : "center", fontSize : "2rem", padding : "5px"}}>{time}</h1>
	<button style={{backgroundColor : "green", color : "white", padding : "10px 19px", margin : "5px", cursor : "pointer", borderRadius : "5px"}} onClick={handleStart}>Start</button>
	<button style={{backgroundColor : "red", color : "white", padding : "10px 12px", margin : "5px", cursor : "pointer", borderRadius : "5px"}} onClick={handlePause}>Pause</button>
	<button style={{backgroundColor : "blue", color : "white", padding : "10px 19px", margin : "5px", cursor : "pointer", borderRadius : "5px"}} onClick={handleReset}>Reset</button>
	</div>);
}

export default TimerApp;