import React, {Component, useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

// const uri = "mongodb+srv://crysta:3.14159265e@crysta-database.qrvsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// client.connect();
// console.log("Connected");

class EnergyGraph extends Component{

    constructor(props){
        super(props);
        this.state = {
            mongo_data: [],
            task_switches: [],
            labels: [],
            graphData:props.graphData
        }
    }

    static defaultProps = {
        legendPosition: 'bottom'
    }

    componentWillMount(){
        this.getGraphData();
        this.getDataFromDb();
        if (!this.state.IntervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 10000);
            this.setState({ IntervalIsSet : interval});
        }
    }

    componentWillUnmount() {
        if (this.state.IntervalIsSet) {
            clearInterval(this.state.IntervalIsSet);
            this.setState({ IntervalIsSet : null });
        }
    }

    getDataFromDb = () => {
    //     // fetch('http://localhost:3001/api/getData').then(data => {
    //     //     const token = data.data;
    //     //     console.log(token);
    //     //     let task_switches = [];
    //     //     let labels = [];
    //     //     token.forEach(entry => {
    //     //         labels.push(entry.hour);
    //     //         task_switches.push(entry.task_switches);
    //     //     });
    //     //     console.log(task_switches);
    //     //     console.log(labels);
    //     // });  

    //     axios.get('http://localhost:3001/api/getData').then((response) =>{
    //         var data = response.data;
    //         const data_values = Object.values(data);
    //         const data_array = data_values[1];
    //         var task_switches = [];
    //         var labels = [];
    //         this.setState({ mongo_data: data_array});
    //         data_array.forEach(data_array => {
    //             labels.push(data_array.hour);
    //             task_switches.push(data_array.task_switches);
    //         })
    //         console.log(task_switches);
    //         console.log(labels);
    //         console.log("Received task_switches!");
    //         console.log(data_array);
    //     })
    //     // .catch(() => {
    //     //     alert('There seems to be an error.');
    //     // });
    }


    getGraphData() {
        axios.get('/api/getData').then((response) =>{
            var data = response.data;
            const data_values = Object.values(data);
            const data_array = data_values[1];
            var div_scores = [];
            var labels = [];
            this.setState({ mongo_data: data_array});
            data_array.forEach(data_array => {
                labels.push(data_array.hour);
                div_scores.push(data_array.divided_energy_score);
            })
            console.log(div_scores);
            console.log(labels);
            console.log("Received task_switches!");
            console.log(data_array);
        
            this.setState({
                graphData: {

                    // labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', 
                    // '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM'],
                    labels: labels,
                    datasets: [
                        {
                            label: 'ENERGY SCORE',
                            // data: [
                            //     11,
                            //     16,
                            //     18,
                            //     16,
                            //     14,
                            //     9,
                            //     2,
                            //     3,
                            //     4,
                            //     12,
                            //     18,
                            //     22,
                            //     24,
                            //     26,
                            //     23,
                            //     22,  
                            //     18
                            // ],
                            data: div_scores,
                            borderWidth: 8,
                            borderColor: "rgba(20, 177, 183, 0.4)",
                            pointBackgroundColor: "rgb(77, 77, 77, 1)",
                            tension: 0.4,
                            pointRadius: 8,
                            legend: {
                                position: 'bottom'
                            }
                        }
                    ]
                }
            });
        });  
    }


    render(){

        return (
            <div className = "energy-graph">
                <Line
                    data = {this.state.graphData}
                    width = {1580}
                    height = {1010}
                    options = {{
                        maintainAspectRatio: true,
                        responsive: true,
                    }}
                />
            </div>
        )
    }
}

export default EnergyGraph;