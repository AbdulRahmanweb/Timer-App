import React, {useState, useEffect} from 'react';

function TimerApp() {

	const [time, setTime] = useState(0);
	const [isRunniung, setIsRunning] = useState(false);
	const [messages, setMessages] = useState([]);//Storing message
	const [newTime, setNewTime] = useState();//User set metime in input
	const [newMessage, setNewMessage] = useState("");//user set message in input
	const [displayMessage, setDisplayMessage] = useState("");

	useEffect(() => {
		let interval;
		if (isRunniung) {
			interval = setInterval(() => {
				setTime((prevState) => prevState + 1);
			}, 250);
		} else {
			clearInterval(interval);
		}
		//Checking if timer match any stored message time
		const foundMessage = messages.find((msg) => msg.time === time);
		if (foundMessage) {
			setDisplayMessage(foundMessage.text);
		}

		return () => clearInterval(interval);
	}, [isRunniung, time, messages]);

	//Function to add a new message
	function addMessage() {
		if (newTime && newMessage) {
			setMessages([...messages, {time : parseInt(newTime), text : newMessage}]);
		}
		setNewMessage("");
		setNewTime("");
	}
	function handleStart() {
		setIsRunning(true);
	}

	function handlePause() {
		setIsRunning(false)
	}

	function handleReset() {
		setTime(0);
		setMessages([]);
		setDisplayMessage("");
	}

	function handleNewTime(e) {
		setNewTime(e.target.value);
	}

	function handleNewMessage(e) {
		setNewMessage(e.target.value);
	}

	return(<div id='timer-app'>
	<h1 style={{textAlign : "center"}}>Timer App</h1>

	<h1 style={{textAlign : "center", fontSize : "2rem"}}>{time}</h1>
	{displayMessage && <p>{displayMessage}</p>}
	
	{/*Input field to enter target time*/}
	<div id='inputs-container'>
	<input type='number' placeholder='Enter time...' value={newTime} onChange={handleNewTime} />
	{/*input field to enter target message*/}
	<input type='text' placeholder='Enter nessage...' value={newMessage} onChange={handleNewMessage} />
	<button onClick={addMessage}>Add</button>
	</div>
	<div id='buttons'>
	<button style={{backgroundColor : "green", color : "white", padding : "10px 19px", cursor : "pointer", borderRadius : "5px", border : "none", margin : "5px"}} onClick={handleStart}>Start</button>
	<button style={{backgroundColor : "red", color : "white", padding : "10px 12px", cursor : "pointer", borderRadius : "5px", border : "none", margin : "5px"}} onClick={handlePause}>Pause</button>
	<button style={{backgroundColor : "blue", color : "white", padding : "10px 19px", cursor : "pointer", borderRadius : "5px", border : "none", margin : "5px"}} onClick={handleReset}>Reset</button>
	</div>
	{/*/Showing message*/}
	{messages.length > 0 &&
	(<div id='message-container'>
	<h3 style={{padding : "0px", margin : "5px 0px"}}>Sheduled Message</h3>
	<ul>
		{messages.map((msg, index) => {
			return <li key={index}>{msg.time}.m/s Later - {msg.text}</li>
		})}
	</ul>
	</div>)}
		<h3 style={{margin : "0px", padding : "0px"}}>Suggested Messages</h3>
		<div style={{overflowX : "auto", maxWidth : "250px", whiteSpace : "nowrap", scrollbarWidth: "none"}}>
			{["Hello", "Work Time", "Frontend", "Web Developement", "Microsoft", "Instagram"].map((msg, index) => {
				return <button style={{margin : "2px", padding : "5px", backgroundColor : "#343842", color : "white", borderRadius : '5px', border : "1px solid #282c34"}} key={index} onClick={() => setNewMessage(msg)}>{msg}</button>
			})}
		</div>
	</div>);
}

export default TimerApp;