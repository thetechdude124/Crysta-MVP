import React, { useEffect } from 'react';
import './Energy.css';
import EnergyGraph from './EnergyGraph'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';


function Energy() {
    
   

    // if (isAuthenticated) {
    //     const printname = user?.name;
    //     console.log(printname);
    // };

    // if (isAuthenticated) {

    //     axios.post('http://127.0.0.1:5000/user', user?.name);

    //     // const data = res.data;
    //     // console.log(data);
    //     // console.log(res.data);
    // };


    // function SendData() {
    //     var date = new Date();
    //     if (date.getMinutes() === 0 && isAuthenticated) {

    //         setTimeout(SendData, delay);
    //     } else {
            
    //         date.setHours(date.getHours() + 1)
    //         date.setMinutes(0);
    //         date.setSeconds(0);

    //         var delay = date - new Date();
    //         setTimeout(SendData, delay);
    //     };
    // };   

    // useEffect((user)=>{



    // },[])

    return (
        <div className = "container-energy" class = "flex flex-col top-0 justify-items-center bg-gradient-to-r from-blue-400 via-green-300 to-green-200 h-screen w-screen">
            <div className = "copyright" class = "text-right mt-3 mr-5 text-sm font-semibold text-white">Copyright Crysta 2021</div>
            <div className = "insights-energy-container" class = "flex h-5/6 w-5/6 m-auto">
                <div className = "insights-menu" class = "flex bg-gray-50 shadow-md rounded-3xl h-full w-2/6 mr-10 m-auto">
                    <div className = "energy-level-heading" class = "flex bg-green-400 h-8 w-64 rounded-3xl mt-2.5 ml-8 justify-center fixed">
                        <p class = "text-white mt-1.5 font-semibold text-sm">INSIGHTS</p> 
                    </div>
                </div>
                <div className = "energy-menu" class = "flex bg-gray-50 shadow-md rounded-3xl h-full w-5/6 m-auto">
                    <div className = "energy-level-heading" class = "flex bg-green-400 h-8 w-64 rounded-3xl mt-2.5 ml-8 justify-center fixed">
                        <p class = "text-white mt-1.5 font-semibold text-sm">YOUR ENERGY LEVELS</p> 
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
                    <div className = "energy-graph-container" class = "flex-1 flex-col ml-8 mt-12 mr-8 mb-0 w-5/6 h-5/6">
                        <EnergyGraph />
                    </div>
                </div>
            </div>

            
            <div className = "version" class = "text-right text-md text-black font-semibold mr-5 mb-5">v.0.1</div>
        </div>
    );
};

export default Energy;