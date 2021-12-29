import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

export default function FunctionGraph(props) {
    //Setting up state variables
    const [chart, setChart] = useState();

    //Fetching data from the API:
    useEffect(() => {
        const getData = async() => {
            let labels = [];
            let div_scores = [];
            await axios.get('/api/getData?username=' + props.sendemail + '&source=energy-tracker').then((response) => {
                console.log(props.sendemail);
                var data = response.data;
                const data_values = Object.values(data);
                const data_array = data_values[1];
                data_array.forEach(data_array => {
                    labels.push(data_array.hour);
                    div_scores.push(data_array.divided_energy_score);
                });
            });
            setChart({
                labels: labels,
                datasets: [{
                    label: 'ENERGY SCORE',
                    data: div_scores,
                    borderWidth: 8,
                    borderColor: "rgba(20, 177, 183, 0.4)",
                    pointBackgroundColor: "rgb(77, 77, 77, 1)",
                    tension: 0.4,
                    pointRadius: 8,
                }]
            });
        }
        getData();
    }, []);
    
    return (
        <div className = "energy-graph-container" >
            <Line 
                data = {chart} 
                width = {770}
                height = {690}
                options = {{
                    maintainAspectRatio: true,
                    responsive: true,
                }}
            />
        </div>
    )
}