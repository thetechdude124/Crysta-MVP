import { HackTimer } from 'hacktimer';
import React, {Component, useState} from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { IconContext } from 'react-icons';
import chime from './Pomodoro_Chime.mp3';
import logo from './CrystaLogo.svg';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function Pomodoro() {

    const { user, isAuthenticated } = useAuth0;

    //Setting up variables for time, break, and states
    const [timedisplay, setTimedisplay] = useState(25*60);
    const [breaktime, setBreaktime] = useState(5*60);
    const [timerOn, setTimeron] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [pomodorochime, setPomodorochime] = useState(new Audio(chime));
    const [sessionCounter, setSessioncounter] = useState(0);

    const playSound = () => {
        pomodorochime.currentTime = 0;
        pomodorochime.volume = 1;
        pomodorochime.play();
    }

    // const postData = () => {
    //     if (isAuthenticated) {
    //         axios.post
    //     }
    // }

    const convertTime = (time) => {
        let n_minutes = Math.floor(time/60);
        let n_seconds = time % 60;
        return (n_minutes < 10 ? "0" + n_minutes: n_minutes) + ":" + (n_seconds < 10 ? "0" + n_seconds: n_seconds)
    }

    const convertBreaktime = (timebreak) => {
        let break_minutes = Math.floor(timebreak/60);
        return (break_minutes)
    }

    const timeChange = (amount, destination) => {

        if (destination === "break") {
            //Check if breaktime is at 5 minutes and if the user is requesting to lower the time - if true, simply don' return anything
            if (breaktime <= 300 && amount < 0) {
                return;
            }
            setBreaktime((prev) => prev + amount);

        } else if (destination === "focus") {
            if (timedisplay <= 300 && amount < 0) {
                return;
            }
            setTimedisplay((prev) => prev + amount);
            if(!timerOn) {
                setTimedisplay(timedisplay + amount);
            }
        }
    }

    function sessionNotification() {
        const session_notif = new Notification("Ready to get back to work? 🔥", {
            body: "Hey there! Your break has ended. Let's get back in the game!",
            icon: logo
        })
    };

    function breakNotification() {
        const break_notif = new Notification("Time for a break! 🌊", {
            body: "Hey there! Your work session has ended. Feel free to sit back, get a glass of water, and enjoy!",
            icon: logo
        })
    };

    const notificationHandler = () => {

        //See if notification permission is granted or not
        console.log(Notification.permission);

        if (Notification.permission === "granted") {
            console.log('Notification permission granted. Starting session!')
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                console.log(permission);
                if (permission === "denied") {
                    alert("Hey there! Don't worry - we just need your notification permission to remind you when your work sessions and breaks are over. Thanks :D");
                    Notification.requestPermission();
                }
            })
        } else if (Notification.permission === "denied") {
            alert("Hey there! Don't worry - we just need your notification permission to remind you when your work sessions and breaks are over. Thanks :D");
            Notification.requestPermission();
        }
    }

    const sendToDB = () => {
        //Send pomodoro session data to the database -> number of sessions completed 
        //How would we track the energy levels for that particular session?
        
    }

    const startTimer = () => {
        notificationHandler();
        let milliseconds = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + milliseconds;
        let onBreakVariable = onBreak;
        //If the timer is not on:
        if (!timerOn) {
            //Every 30 miliseconds, we compare the difference between the old date and new date - updating the display.
            let interval = setInterval(() => {
                date = new Date().getTime();
                if (date > nextDate) {
                    setTimedisplay((prev) => {
                        if (prev <= 0 && !onBreakVariable) {
                            playSound();
                            breakNotification();
                            var timezone = (new Date()).getTimezoneOffset() * 60000;
                            var localtime = (new Date(Date.now() - timezone)).toISOString().slice(0, -1);
                            var query_date = localtime.slice(0,10);
                            if (sessionCounter === 0) {
                                setSessioncounter(sessionCounter + 1);
                                const data = {
                                    username: user.name,
                                    date: query_date,
                                    sessions_completed: sessionCounter,
                                    source: "web-app"
                                };
                                axios.post('/api/putData', data)
                                    .then((res) => {
                                console.log(res.data)
                                }).catch(error => {
                                console.log(error)
                                });
                            } else {
                                setSessioncounter(sessionCounter + 1);
                            }
                            onBreakVariable = true;
                            setOnBreak(true);
                            return breaktime;
                        } else if (prev <= 0 && onBreakVariable) {
                            playSound();
                            sessionNotification();
                            onBreakVariable = false;
                            setOnBreak(false);
                            return timedisplay;
                        }
                        return prev - 1;
                    });
                    nextDate += milliseconds;
                }
            }, 30);
            localStorage.clear();
            localStorage.setItem('interval-id', interval);
        }
        if (timerOn) {
            clearInterval(localStorage.getItem('interval-id'));
        }
        setTimeron(!timerOn);
    }

    const timeReset = () => {
        setTimedisplay(25*60);
        setBreaktime(5*60);
        setOnBreak(false);
    }

    return (
    <div className = "pomodoro-timer" class = "flex flex-auto flex-col text-center bg-gray-50 rounded-3xl h-1/2 w-full m-auto shadow-md mb-2.5 items-center">
        <div className = "pomodoro-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-11/12 rounded-3xl mt-2.5 justify-center text-center">
            <p class = "text-white mt-1 font-semibold text-base">POMODORO TIMER</p> 
        </div>
        <div className = "work-session-text" class = "text-sm font-light mt-2.5 mb-2.5">Start a work session. Remember to allow notifications!</div>
        <div className = "timer-element" class = "flex items-center flex-col justify-center w-11/12 h-2/5 bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 rounded-3xl">
            <p className = "session-or-break" class = "flex text-blue-100 font-semibold text-lg mt-0.5 -mb-2">{ onBreak ? "BREAK": "SESSION"}</p>
            <div className = "icons-display" class = "flex items-center">
                <div className = "plus-icon" class = "text-3xl mr-5 mt-2">
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                        <AiFillMinusSquare class = "hover:bg-green-200 rounded-md z-40" onClick = {() => timeChange(-300, "focus")}/>
                    </IconContext.Provider>
                </div>
                <p className = "work-time" class = "font-bold text-white text-6xl">{convertTime(timedisplay)}</p>
                <div className = "plus-icon" class = "text-3xl ml-5 mt-2">
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                        <AiFillPlusSquare class = "hover:bg-green-200 rounded-md z-40" onClick = {() => timeChange(300, "focus")}/>
                    </IconContext.Provider>
                </div>
            </div>
            <BreakTime timebreak = {convertBreaktime(breaktime)} timeChange = {timeChange}/>
        </div>
        <div className = "button-container" class = "flex flex-row">
            <button className = "reset-button" class = "font-medium text-gray-50 h-10 w-32 bg-blue-400 rounded-3xl hover:bg-green-400 transition duration-250 ease-linear mt-5 mr-4" onClick = {timeReset}>RESET</button>
            <button className = "stop-button" class = "font-medium text-gray-50 h-10 w-32 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear mt-5" onClick = {startTimer}>
                {timerOn ? (
                    <p class = "flex font-medium text-gray-50 bg-red-400 rounded-3xl h-10 w-32 justify-center items-center hover:bg-yellow-400 transition duration-250 ease-linear">STOP</p>
                ) : (
                    <>START</>
                )}
            </button>
        </div>
        <div className = "number-sessions-text" class = "flex text-sm mt-4">You've completed <p className = "font-semibold text-green-500 number-sessions ml-1 mr-1">{sessionCounter}</p> work sessions today.</div>
    </div>
    );
}

function BreakTime({timebreak, timeChange}) {
    return (
        <div className = "break-container" class = "flex items-center">
            <div className = "plus-icon" class = "text-md mr-2 mt-1.5">
                <IconContext.Provider value={{ color: '#ffffff' }}>
                    <AiOutlineMinusCircle class = "hover:bg-green-200 rounded-md z-40" onClick = {() => timeChange(-300, "break")}/>
                </IconContext.Provider>
            </div>
            <div className = "break-time" class = "flex text-blue-100 font-semibold text-lg mt-1">Break: <p className = "font-semibold text-white number-sessions ml-1 mr-1">{timebreak}</p> MIN</div>
            <div className = "plus-icon" class = "text-md ml-2 mt-1.5">
                <IconContext.Provider value={{ color: '#ffffff' }}>
                    <AiOutlinePlusCircle class = "hover:bg-green-200 rounded-md z-40" onClick = {() => timeChange(300, "break")}/>
                </IconContext.Provider>
            </div>
        </div>

        )
}

export default Pomodoro;