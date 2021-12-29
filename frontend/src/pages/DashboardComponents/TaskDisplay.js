import React, {useState} from 'react';
import { AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import { IconContext } from 'react-icons';
import { VscCircleOutline } from "react-icons/vsc";
import { MdOutlineCircle } from "react-icons/md";

function TaskDisplay({task, taskStatus, deleteTask}) {

    return (
        //Div for each task
        <div className = "task-container" class = "flex flex-row text-left content-center rounded-3xl h-auto bg-gray-100 my-1" key = {task._id}>

            <div className = "check-box-container" class = "flex text-center w-1/6 justify-center rounded-2xl" onClick = {() => taskStatus(task)}>
                {/* Check if the task is completed - if yes, display a checkmark. */}
                {task.complete ? (
                        <IconContext.Provider value={{ color: '#60a5fa' }}>
                            <AiFillCheckCircle class = "self-center text-3xl hover:bg-green-200 rounded-3xl transition duration-250 ease-linear"/>
                        </IconContext.Provider>
                    ) : (
                        <IconContext.Provider value={{ color: '#60a5fa' }}>
                            <MdOutlineCircle class = "self-center text-2xl hover:bg-green-200 rounded-3xl text-2xl transition duration-250 ease-linear"/>
                        </IconContext.Provider>  
                    )}
            </div>

            <div className = "task-name" class = "flex w-3/6 text-sm font-semibold self-center my-3 ml-auto mr-3">{task.desc}</div>
            <div className = "due-date" class = "flex w-2/6 text-xs font-light self-center text-gray-500 self-end mr-3">Due {task.due_date}</div>
            <div className = "delete-button-container" class = "flex 1/6 text-xl self-center self-end ml-auto mr-3" onClick = {() => deleteTask(task)}>
                <IconContext.Provider value={{ color: '#abb1ba' }}>
                    <AiFillDelete class = "self-center text-xl hover:bg-red-200 rounded-md text-xl transition duration-250 ease-linear"/>
                </IconContext.Provider>  
            </div>

        </div>
    );
}

export default TaskDisplay;