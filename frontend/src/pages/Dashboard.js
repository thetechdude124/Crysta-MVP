import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { IconContext } from 'react-icons';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import FunctionGraph from './FunctionGraph.js';
import Pomodoro from './DashboardComponents/Pomodoro';
import TaskWidget from './DashboardComponents/TaskWidget';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

function Dashboard() {

    //Getting username and authentication status
    const { user, isAuthenticated } = useAuth0();

    //Defining variables for all metrics - most productive time, most creative time, task switches, etc.
    const [productivetime, setProductivetime] = useState();
    const [creativetime, setCreativetime] = useState(); 
    const [taskswitches, setTaskswitches] = useState();
    const [distractingsites, setDistractingsites]  = useState();
    const [timepertask, setTimepertask] = useState();
    const [unscaledscore, setUnscaledscore] = useState();

    //Defining variables for <div> change icons 
    const [taskchange, setTaskchange] = useState();
    const [timechange, setTimechange] = useState();
    const [distractingchange, setDistractingchange] = useState();
    const [unscaledchange, setUnscaledchange] = useState();
    const [graphdiv, setGraphdiv] = useState();
    const [pomodorodiv, setPomodorodiv] = useState();
    const [TaskDiv, setTaskDiv] = useState();

    //Tasks handling

    //Defining a function that returns the average of an array (necessary for procressing)
    const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    //Function to display up or down icon - depending on the input value
    const displayChange = (value_array, metric) => {

        let div_value;
        if (metric === "distracting_sites") {
            if (value_array.at(-1) > value_array.at(-2)) {
                div_value = <div className = "change-icon" class = "text-md ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#f87171' }}>
                                        <BsFillArrowUpCircleFill/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            } else if (value_array.at(-1) < value_array.at(-2)) {
                div_value = <div className = "change-icon" class = "text-md ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#34d399' }}>
                                        <BsFillArrowDownCircleFill/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            } else {
                div_value = <div className = "change-icon" class = "text-sm ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#d9d2d2' }}>
                                        <FaEquals/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            }
        } else {
            if (value_array.at(-1) > value_array.at(-2)) {
                div_value = <div className = "change-icon" class = "text-md ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#34d399' }}>
                                        <BsFillArrowUpCircleFill class = "hover:"/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            } else if (value_array.at(-1) < value_array.at(-2)) {
                div_value = <div className = "change-icon" class = "text-md ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#f87171' }}>
                                        <BsFillArrowDownCircleFill class = "hover:"/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            } else {
                div_value = <div className = "change-icon" class = "text-sm ml-1 mb-0.5">
                                    <IconContext.Provider value={{ color: '#d9d2d2' }}>
                                        <FaEquals class = "hover:"/>
                                    </IconContext.Provider>
                              </div>
                return div_value;
            }
        }
    }
  
    //Checks if user is authenticated - if yes, query backend and process data. If no, do nothing.

    useEffect(() => {
        const checkAuth = async() => {
            if (isAuthenticated) {
                const email = user.email;
                var stringemail = email;
                axios.get('/api/getData?username=' + email + '&source=energy-tracker').then((response) =>{
                    var data = response.data;
                    const data_values = Object.values(data);
                    const data_array = data_values[1];
                    var task_switches = [];
                    var labels = [];
                    var div_scores = [];
                    var unscaled_scores = [];
                    var average_task_times = [];
                    var n_distracting_tasks = [];
            
                    data_array.forEach(data_array => {
                        labels.push(data_array.hour);
                        task_switches.push(data_array.task_switches);
                        div_scores.push(data_array.divided_energy_score);
                        unscaled_scores.push(data_array.unscaled_energy_score);
                        average_task_times.push(data_array.average_task_time);
                        n_distracting_tasks.push(data_array.distracting_tasks);
                    });
                    setTaskswitches(average(task_switches).toFixed(0));
        
                    //Finding the min and max of the div_scores array, to find the most creative and productive times
                    var min_score = Math.min(...div_scores);
                    var min_idx = div_scores.indexOf(min_score);
            
                    var max_score = Math.max(...div_scores);
                    var max_idx = div_scores.indexOf(max_score);
            
                    setCreativetime(labels[min_idx]);
                    setProductivetime(labels[max_idx]);
                    
                    //Distracting Tasks - average
                    setDistractingsites(average(n_distracting_tasks).toFixed(0))
                    //Average of Average Task Times
                    setTimepertask(average(average_task_times).toFixed(0))
                    //Average of Unscaled Scores
                    setUnscaledscore(average(unscaled_scores).toFixed(0))
        
                    //Configuring display - displaying up or down arrows to reflect change in metrics
        
                    setTaskchange(displayChange(task_switches, 'task_switches'));
                    setTimechange(displayChange(average_task_times, 'avg_time_per_task'));
                    setDistractingchange(displayChange(n_distracting_tasks, 'distracting_sites'));
                    setUnscaledchange(displayChange(unscaled_scores, 'unscaled_energy_score'));
        
                });
                console.log(stringemail);
                setGraphdiv(<FunctionGraph sendemail = {stringemail} />);
                setPomodorodiv(<Pomodoro user_email = {stringemail}/>)
                setTaskDiv(<TaskWidget user_email = {stringemail}/>)
            } else {
                setGraphdiv(<div class = "flex font-bold text-lg text-center justify-center items-center">Loading...</div>);
                setPomodorodiv(<div class = "flex font-bold text-lg text-center justify-center items-center">Loading...</div>);
                setTaskDiv(<div class = "flex font-bold text-lg text-center justify-center items-center">Loading...</div>)
            }
        }
        checkAuth();
    }, [])
    
    //Define divs - different elements will be displayed depending on whether the value is undefined
    let prod_div;
    let task_display;
    let distracting_display;
    let time_display;
    let unscaled_display;

    if (productivetime === undefined) {
        prod_div = <div className = 'most-productive-time' class = 'text-sm w-11/12 mt-4 font-light'>This dashboard will be filled automatically every hour - and will get more accurate as you continue to use the Crysta energy tracker!</div>;
    } else {
        prod_div = <div className = 'most-productive-time' class = 'text-3xl mt-4 font-light'>{productivetime}</div>;
    };

    if (taskswitches === 'NaN') {
        task_display = <div class = "text-3xl font-light mb-2">0</div>;
    } else {
        task_display = <div class = "text-3xl font-light mb-2">{taskswitches}</div>;
    }

    if (distractingsites === 'NaN') {
        distracting_display = <div class = "text-3xl font-light mb-2">0</div>;
    } else {
        distracting_display = <div class = "text-3xl font-light mb-2">{distractingsites}</div>;
    }

    if (timepertask === 'NaN') {
        time_display = <div class = "text-3xl font-light mb-2">0</div>;
    } else {
        time_display = <div class = "text-3xl font-light mb-2">{timepertask}</div>;
    }

    if (unscaledscore === 'NaN') {
        unscaled_display = <div class = "text-3xl font-light mb-2">0</div>;
    } else {
        unscaled_display = <div class = "text-3xl font-light mb-2">{unscaledscore}</div>;
    }

    return (
        <div className = "container-energy" class = "flex flex-col top-0 justify-items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen">
            <div className = "intro-container" class = "flex w-11/12 m-auto mr-12">
                <div className = "Introduction/Greeting" class = "text-3xl mt-2 font-semibold text-white">Hey there! Let's get things done.</div>    
            </div>
            <div className = "insights-energy-container" class = "flex h-5/6 w-11/12 -mt-2 m-auto">
                <div className = "insights-menu" class = "flex flex-col text-center bg-gray-50 shadow-md rounded-3xl h-full w-1/5 m-auto items-center">
                    <div className = "energy-level-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-11/12 rounded-3xl mt-2.5 justify-center">
                        <p class = "text-white mt-1 font-semibold text-base">INSIGHTS</p> 
                    </div>
                    <div className = "energy-level-heading" class = "flex bg-gray-200 h-8 w-11/12 rounded-3xl mt-8 justify-center ">
                        <p class = "text-blue-700 mt-1.5 font-semibold text-sm">MOST PRODUCTIVE TIME</p> 
                    </div>
                    {prod_div}
                    <div className = "energy-level-heading" class = "flex bg-gray-200 h-8 w-11/12 rounded-3xl mt-5 justify-center ">
                        <p class = "text-red-700 mt-1.5 font-semibold text-sm">MOST CREATIVE TIME</p> 
                    </div>
                    <div className = "most-creative-time" class = "text-3xl mt-4 font-light">{creativetime}</div>

                    <div className = "energy-level-heading" class = "flex bg-gray-200 h-8 w-11/12 rounded-3xl mt-5 justify-center ">
                        <p class = "text-black mt-1.5 font-semibold text-sm">OTHER INSIGHTS</p> 
                    </div>
                    <div className = "other-metrics" class = "grid grid-cols-2 w-11/12 mt-6 gap-y-4 bg-gray-200 rounded-2xl mb-2.5"> 
                        <div className = "task-switches" class = "flex flex-col items-center justify-center ml-2 mt-2 bg-gray-100 rounded-2xl mr-2">
                            <div class = "text-xs font-semibold mt-3">TASK SWITCHES</div>
                            <div className = "score-and-ranking-container" class = "flex justify-between items-center w-12/12">{task_display}{taskchange}</div>
                        </div>
                        <div className = "distracting-sites" class = "flex flex-col justify-center items-center mr-2 mt-2 bg-gray-100 rounded-2xl ml-2">
                            <div class = "text-xs font-semibold mt-3"># DISTRACTING SITES</div>
                            <div className = "score-and-ranking-container" class = "flex flex-row items-center">{distracting_display}{distractingchange}</div>
                        </div>
                        <div className = "time-per-task" class = "flex flex-col justify-center items-center ml-2 mb-2 bg-gray-100 rounded-2xl mr-2">
                            <div class = "text-xs font-semibold mt-3">SECONDS SPENT PER TASK</div>
                            <div className = "score-and-ranking-container" class = "flex flex-row items-center">{time_display}{timechange}</div>
                        </div>
                        <div className = "unscaled-score" class = "flex flex-col justify-center items-center mr-2 mb-2 bg-gray-100 rounded-2xl ml-2">
                            <div class = "text-xs font-semibold mt-3">SCORE WITHOUT DISTRACTIONS</div>
                            <div className = "score-and-ranking-container" class = "flex flex-row items-center">{unscaled_display}{unscaledchange}</div>
                        </div>
                    </div>
                    <div className = "energy-level-heading" class = "flex bg-gray-200 w-11/12 rounded-3xl mt-3 justify-center ">
                        <p class = "text-black mt-3 mb-3 ml-2 mr-2 text-xs">We'd love your feedback! <a href="https://forms.gle/wvdWMDpoVSbqK2cAA" target = "_blank" class="font-semibold underline text-blue-400 hover:text-green-400 transition duration-250 ease-linear">How are you liking Crysta?</a></p> 
                    </div>
                </div>
                <div className = "energy-menu" class = "flex bg-gray-50 shadow-md rounded-3xl h-full w-6/12 m-auto">
                    <div className = "energy-level-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-64 rounded-3xl mt-2.5 ml-7 justify-center fixed">
                        <p class = "text-white mt-1 font-semibold text-base">YOUR ENERGY LEVELS</p> 
                    </div>
                    <div className = "energy-graph-container" class = "flex-1 flex-col ml-7 mt-12 mr-8 mb-0 w-5/6 h-5/6">
                        {graphdiv}
                    </div>
                </div>
                <div className = "pomodoro-tasks-container" class = "flex flex-col h-full w-3/12 m-auto ">
                    {pomodorodiv}
                    {TaskDiv}
                </div>
            </div>

            <div className = "version" class = "text-right text-sm text-black font-semibold mr-5 mb-5">MVP - v.0.2 | ©Crysta 2021</div>
        </div>
    );
};

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <div> Hey there! We're just redirecting you 😁</div>,
})
