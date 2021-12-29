import { useState } from "react";

function TaskEdit({ task, addTask }) {

    //Set description and date locally 
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");

    //Create function SaveTask for "New Task" form submission - using the addTask function from TaskWidget.js
    const saveTask = (input) => {
        input.preventDefault();
        addTask({ desc: desc, due_date: date });

        setDesc("");
        setDate("");
    };

    return (
        <div className = "new-task-form" class = "flex flex-col text-center w-12/12 h-6/6 justify-center">

            <h3 class = "text-md font-light self-center mt-3 mb-auto">NEW TASK</h3>
            <form class = "flex flex-col w-12/12 h-5/6 text-center justify-center items-center">

                {/* Task Input */}
                <div className = "task-field" class = "flex flex-row my-1.5 w-12/12 h-1/2">
                    {/* <label htmlFor = "desc" class = "flex w-1/6 text-sm font-regular self-center ml-auto mr-auto">Task:</label> */}
                    <input type = "text" name = "desc" id = "desc" placeholder = "Task" value = {desc} onChange = {(input) => setDesc(input.target.value)} class = "form-input rounded-md px-3 py-2 bg-gray-100 text-md h-1/2 w-6/6 border-gray-300 focus:border-blue-400 border-opacity-25"/>
                </div>


                {/* Date Input */}
                <div className = "date-field" class = "flex flex-row my-1.5 w-12/12 h-1/2">
                    {/* <label htmlFor = "date" class = "flex w-2/6 text-sm font-regular self-center mr-auto">Date:</label> */}
                    <input type = "text" name = "date" id = "date" placeholder = "Date (YYYY/MM/DD)" value = {date} onChange = {(input) => setDate(input.target.value)} class = "form-input rounded-md px-3 py-2 bg-gray-100 text-md h-1/2 border-gray-300 focus:border-blue-400 border-opacity-25"/>
                </div>

                <button className = "save-task" class = "font-medium text-sm text-gray-50 h-8 w-28 bg-green-400 rounded-3xl self-center my-3 hover:bg-blue-400 transition duration-250 ease-linear" onClick = {saveTask}>SAVE TASK</button>

            </form>

        </div>
    )
}

export default TaskEdit;