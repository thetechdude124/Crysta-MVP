import React, {useState} from 'react';

function TaskWidget() {

    return (
        <div className = "task-widget-container" class = "flex flex-auto flex-col text-center bg-gray-50 rounded-3xl h-1/2 w-full m-auto shadow-md mt-3 items-center">
            <div className = "task-widget-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-11/12 rounded-3xl mt-2.5 justify-center text-center">
                <p class = "text-white mt-1 font-semibold text-base">TASK WIDGET</p> 
            </div>
            <div className = "coming-soon-text" class = "text-sm font-light mt-2.5 mb-2.5">Coming soon...</div>
        </div>
    )
}

export default TaskWidget;