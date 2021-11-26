import React, {Component, useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

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
    }

    getGraphData() {
        axios.get('/api/getData?username=' + this.props.sent_useremail).then((response) =>{

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
                    labels: labels,
                    datasets: [
                        {
                            label: 'ENERGY SCORE',
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
                    height = {1420}
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