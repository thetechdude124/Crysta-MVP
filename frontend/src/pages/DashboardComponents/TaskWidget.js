import React, { useEffect, useState } from 'react';
import TaskDisplay from './TaskDisplay';
import chime from './Complete_Task_Sound.mp3';
import TaskEdit from './TaskEdit.js';
import axios from 'axios';

function TaskWidget(props) {

    //Get user email
    const sendemail = props.user_email;

    //Define taskchime and whether or not to choose the task edit menu
    const [taskchime, setTaskchime] = useState(new Audio(chime));
    const [showTaskEdit, setShowTaskEdit] = useState(false);

    //Define task state
    const [tasks, setTasks] = useState();
    const [TasksExist, setTasksExist] = useState(false);

    //Fetch Task Data from API
    useEffect(() => {
        const getTaskData = async() => {

            let save_task_array = [];
            await axios.get('/api/getData?username=' + props.user_email + '&source=tasks').then((response) => {
                var task_get_data = response.data;
                const task_values = Object.values(task_get_data);
                const task_array = task_values[1];

                task_array.forEach(task_object => {
                    save_task_array.push(task_object);
                });
            });

            setTasks(save_task_array);

            console.log(tasks);
            if (save_task_array !== 'undefined') {
                setTasksExist(true);
            } else {
                setTasksExist(false);
            }

        };
        getTaskData();
    }, []);

    // const [tasks, setTasks] = useState([
    //     { desc: "Complete Project", id: 1, due_date: "2021-12-14", complete: false},
    //     { desc: "Crysta - Engine of Growth", id : 2, due_date: "2021-12-16", complete: false},
    // ]);

    const taskStatus = (task) => {
        console.log("completing task");
        console.log(task);
        console.log(task._id);
        //Iterate through all tasks and check if it is the task to be completed (check id) - then set to complete if not already set
        setTasks(
            tasks.map((checkTask) => {

                console.log(checkTask.complete);
                //Set complete to the opposite of what it is currently set to
                checkTask.complete = 
                    task._id === checkTask._id ? !checkTask.complete : checkTask.complete;
                
                console.log(checkTask.complete);

                //Check to see if task is now complete or incomplete - if complete, play the taskchime
                if (checkTask.complete && task._id === checkTask._id) {
                    
                    //Play chime
                    taskchime.currentTime = 0;
                    taskchime.volume = 1;
                    taskchime.play();
                
                }

                //Check if the task id is correct - if so, update the database through the api
                if (task._id === checkTask._id) {

                    //Set ID variable 
                    var DocumentID = task._id;

                    //Define update_data object
                    const update_data = {
                        username: sendemail,
                        desc: task.desc,
                        due_date: task.due_date,
                        complete: checkTask.complete,
                        source: "tasks"
                    }

                    console.log(update_data);

                    //Update Data through API
                    axios.post('/api/updateData', {DocumentID, update_data})
                    .then((res) => {
                        console.log(res.data);
                    }).catch(error => {
                        console.log(error);
                    })

                }
                 
                return checkTask;
            })
        )
    }

    const addTask = ({desc, due_date}) => {

        console.log("Creating new task!")

        //Generating ID
        const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
        rnd(Date.now()/1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random()*16));
        var id = ObjectId();

        //Creating a new task with setTasks
        setTasks([
            { desc: desc, due_date: due_date, id: id, complete: false},
            ...tasks,
        ]);
        
        //Saving new task into data object
        const task_data = {
            _id: id,
            username: sendemail,
            desc: desc,
            due_date: due_date,
            complete: false,
            source: "tasks"
        };

        //Post data to database through API
        axios.post('/api/putData', task_data).then((res) => {
            console.log(res.data)
        }).catch(error => {console.log(error)
        });

        setTasksExist(true);
        //Reload Page
        window.location.reload(false);
    };

    const deleteTask = (task) => {

        const data = {
            id: task._id
        };
        console.log(task._id);
        axios.delete('/api/deleteData', {data})
        .then((res) => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        })

        //Reload Page
        window.location.reload(false);
    }

    console.log(TasksExist);
    let add_task_div;

    if (TasksExist === false) {
        add_task_div = <div className = "task-text" class = "text-sm font-light mt-2.5 mb-2.5">Get started by adding a task!</div> 
    } else {
        add_task_div = <></>
    }
    return (
        <div className = "task-widget-container" class = "flex flex-auto flex-col text-center bg-gray-50 rounded-3xl h-1/2 w-full m-auto shadow-md mt-1.5 items-center" key = {tasks}>
            <div className = "task-widget-heading" class = "flex bg-gradient-to-r from-blue-400 via-blue-400 to-green-300 h-8 w-11/12 rounded-3xl mt-2.5 justify-center text-center">
                <p class = "text-white my-1 font-semibold self-center text-base">TASK WIDGET</p> 
            </div>
            {!TasksExist? (
                <></>
                ) : (
                <div className = "task-text" class = "text-sm font-light mt-2.5 mb-2.5">Strive for excellence.</div>   
            )} 
            {!showTaskEdit && TasksExist ? (
                        <div className = "task-list" class = "overflow-auto h-4/6 w-10/12 m-auto">
                            {
                            //Iterate through tasks
                            tasks.map((task) => (
                                <TaskDisplay task = {task} key={task.id} taskStatus = {taskStatus} deleteTask = {deleteTask}/>
                            ))}
                        </div>
                    ) : (
                        <div className = "showtaskedit" class = "flex flex-initial overflow-auto h-4/6 w-11/12 m-auto justify-center items-center align-middle">
                            {showTaskEdit && <TaskEdit task={{}} addTask ={addTask} />}
                        </div> 
                    )}
                    <div className = "task-features" class = "h-2/12 mb-8 mt-auto">
                        <button className = "new-task" class = "font-medium text-gray-50 h-10 w-32 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear" onClick = {() => setShowTaskEdit(!showTaskEdit)}>
                            {!showTaskEdit && "NEW TASK"}
                            {showTaskEdit && (<p class = "flex font-medium text-gray-50 bg-red-400 rounded-3xl h-10 w-32 justify-center items-center hover:bg-yellow-400 transition duration-250 ease-linear">CLOSE</p>)}
                        </button>
                    </div>
            {/* {TasksExist ? (
                <>
                    {!showTaskEdit ? (
                        <div className = "task-list" class = "overflow-auto h-4/6 w-10/12 m-auto">
                            {
                            //Iterate through tasks
                            tasks.map((task) => (
                                <TaskDisplay task = {task} key={task.id} taskStatus = {taskStatus} deleteTask = {deleteTask}/>
                            ))}
                        </div>
                    ) : (
                        <div className = "showtaskedit" class = "flex flex-initial overflow-auto h-4/6 w-11/12 m-auto justify-center items-center align-middle">
                            {showTaskEdit && <TaskEdit task={{}} addTask ={addTask} />}
                        </div> 
                    )}
                    <div className = "task-features" class = "h-2/12 mb-8 mt-auto">
                        <button className = "new-task" class = "font-medium text-gray-50 h-10 w-32 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear" onClick = {() => setShowTaskEdit(!showTaskEdit)}>
                            {!showTaskEdit && "NEW TASK"}
                            {showTaskEdit && (<p class = "flex font-medium text-gray-50 bg-red-400 rounded-3xl h-10 w-32 justify-center items-center hover:bg-yellow-400 transition duration-250 ease-linear">CLOSE</p>)}
                        </button>
                    </div>
                </>
                ) : (
                    <>
                    <div className = "task-text" class = "text-sm font-light mt-2.5 mb-2.5">Get started by adding a task!</div>
                    {!showTaskEdit ? (
                        <div className = "task-list" class = "overflow-auto h-4/6 w-10/12 m-auto">
                            {
                            //Iterate through tasks
                            tasks.map((task) => (
                                <TaskDisplay task = {task} key={task.id} taskStatus = {taskStatus} deleteTask = {deleteTask}/>
                            ))}
                        </div>
                    ) : (
                        <div className = "showtaskedit" class = "flex flex-initial overflow-auto h-4/6 w-11/12 m-auto justify-center items-center align-middle">
                            {showTaskEdit && <TaskEdit task={{}} addTask ={addTask} />}
                        </div> 
                    )}
                    <div className = "task-features" class = "h-2/12 mb-8 mt-auto">
                        <button className = "new-task" class = "font-medium text-gray-50 h-10 w-32 bg-green-400 rounded-3xl hover:bg-blue-400 transition duration-250 ease-linear" onClick = {() => setShowTaskEdit(!showTaskEdit)}>
                            {!showTaskEdit && "NEW TASK"}
                            {showTaskEdit && (<p class = "flex font-medium text-gray-50 bg-red-400 rounded-3xl h-10 w-32 justify-center items-center hover:bg-yellow-400 transition duration-250 ease-linear">CLOSE</p>)}
                        </button>
                    </div>
                    </>
            )} */}
        </div>
    )
}

export default TaskWidget;