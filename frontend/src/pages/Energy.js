import React, { useState } from 'react';
import './Energy.css';
import EnergyGraph from './EnergyGraph'
import axios from 'axios';

function Energy() {

    const [productivetime, setProductivetime] = useState();
    const [creativetime, setCreativetime] = useState(); 
    const [taskswitches, setTaskswitches] = useState();
    const [distractingsites, setDistractingsites]  = useState();
    const [timepertask, setTimepertask] = useState();
    const [unscaledscore, setUnscaledscore] = useState();

    const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    axios.get('/api/getData').then((response) =>{
        var data = response.data;
        const data_values = Object.values(data);
        const data_array = data_values[1];
        var task_switches = [];
        var labels = [];
        var div_scores = [];
        var unscaled_scores = [];
        var average_task_times = [];
        var n_distracting_tasks = [];

        // this.setState({ mongo_data: data_array});

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
    });


    let prod_div;

    if (productivetime === undefined) {
        prod_div = <div className = 'most-productive-time' class = 'text-sm w-11/12 mt-4 font-light'>This dashboard will be filled automatically and will get more accurate as you continue to use Crysta.</div>;
    } else {
        prod_div = <div className = 'most-productive-time' class = 'text-3xl mt-4 font-light'>{productivetime}</div>;
    }

    return (
        <div className = "container-energy" class = "flex flex-col top-0 justify-items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen">
            <div className = "copyright" class = "text-right mt-3 mr-5 text-sm font-semibold text-black">Copyright Crysta 2021</div>
            <div className = "insights-energy-container" class = "flex h-5/6 w-5/6 m-auto">
                <div className = "insights-menu" class = "flex flex-col text-center bg-gray-50 shadow-md rounded-3xl h-full w-3/12 mr-8 m-auto items-center">
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
                        <div className = "task-switches" class = "flex flex-col justify-center ml-2 mt-2 bg-gray-100 rounded-2xl mr-2">
                            <div class = "text-xs font-semibold mt-3">TASK SWITCHES</div>
                            <div class = "text-4xl font-light mb-3">{taskswitches}</div>
                        </div>
                        <div className = "distracting-sites" class = "flex flex-col justify-center mr-2 mt-2 bg-gray-100 rounded-2xl ml-2">
                            <div class = "text-xs font-semibold mt-3"># DISTRACTING SITES</div>
                            <div class = "text-4xl font-light mb-3">{distractingsites}</div>
                        </div>
                        <div className = "time-per-task" class = "flex flex-col justify-center ml-2 mb-2 bg-gray-100 rounded-2xl mr-2">
                            <div class = "text-xs font-semibold mt-3">TIME PER TASK (SEC)</div>
                            <div class = "text-4xl font-light mb-3">{timepertask}</div>
                        </div>
                        <div className = "unscaled-score" class = "flex flex-col justify-center mr-2 mb-2 bg-gray-100 rounded-2xl ml-2">
                            <div class = "text-xs font-semibold mt-3">UNSCALED SCORE</div>
                            <div class = "text-4xl font-light mb-3">{unscaledscore}</div>
                        </div>
                    </div>
                    <div className = "energy-level-heading" class = "flex bg-gray-200 w-11/12 rounded-3xl mt-3 justify-center ">
                        <p class = "text-black mt-3 mb-3 ml-2 mr-2 text-xs">These are the insights we found - the more you use Crysta, the more accurate they get!</p> 
                    </div>
                </div>
                <div className = "energy-menu" class = "flex bg-gray-50 shadow-md rounded-3xl h-full w-9/12 m-auto">
                    <div className = "energy-level-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-64 rounded-3xl mt-2.5 ml-7 justify-center fixed">
                        <p class = "text-white mt-1 font-semibold text-base">YOUR ENERGY LEVELS</p> 
                    </div>
                    {/* <div className = "info-icon">
                        <IconContext.Provider value={{ color: '#4d4d4d' }}>
                            <AiOutlineInfoCircle class = "text-md mt-3.5 h-6 w-6 ml-72 fixed"/>
                        </IconContext.Provider>
                            <div></div>
                    </div> */}

                    
                    {/* <div className = "info-text" class = "flex leading-3 text-xs font-semibold mt-3.5 ml-80 text-left w-2/4 float-right fixed">
                        <p class = "">Distractions are a sign of low energy. Crysta analyzes the number of task switches you make and updates this graph every hour, calculating your most and least productive times. Lower = more productive (better for focus), Higher = less productive (better for creativity).</p>
                    </div> */}
                    <div className = "energy-graph-container" class = "flex-1 flex-col ml-7 mt-12 mr-8 mb-0 w-5/6 h-5/6">
                        <EnergyGraph />
                    </div>
                </div>
            </div>

            
            <div className = "version" class = "text-right text-md text-black font-semibold mr-5 mb-5">v.0.1</div>
        </div>
    );
};

export default Energy;