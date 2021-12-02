// import React, {Component, useState, useEffect} from 'react';
// import {Line} from 'react-chartjs-2';
// import axios from 'axios';

// class EnergyGraph extends Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             mongo_data: [],
//             graphData:props.graphData
//         }
//     }

//     static defaultProps = {
//         legendPosition: 'bottom'
//     }

//     componentWillMount(){
        
//         this.getGraphData();
//         // this.getDataFromDb();
//         // if (!this.state.IntervalIsSet) {
//         //     let interval = setInterval(this.getDataFromDb, 10000);
//         //     this.setState({ IntervalIsSet : interval});
//         // }
//     }

//     // componentWillUnmount() {
//     //     if (this.state.IntervalIsSet) {
//     //         clearInterval(this.state.IntervalIsSet);
//     //         this.setState({ IntervalIsSet : null });
//     //     }
//     // }

//     // getDataFromDb = () => {
//     // }

//     // componentDidUpdate(prevProps) {
//     //     console.log(prevProps.labels);
//     //     console.log(this.props.labels);
//     //     console.log(this.labels)
//     //     // if (prevProps.labels !== this.props.labels) {
//     //     //     // this.setState({labels: this.props.labels});
//     //     // }
//     // }

//     getGraphData() {
        
//         this.setState({
//             graphData: {
//                 labels: this.props.labels,
//                 datasets: [
//                     {
//                         label: 'ENERGY SCORE',
//                         data: this.props.divscores,
//                         borderWidth: 8,
//                         borderColor: "rgba(20, 177, 183, 0.4)",
//                         pointBackgroundColor: "rgb(77, 77, 77, 1)",
//                         tension: 0.4,
//                         pointRadius: 8,
//                         legend: {
//                             position: 'bottom'
//                         }
//                     }
//                 ]
//             }
//         });
 
//     }


//     render(){
//          return (
//             <div className = "energy-graph">
//                 <Line
//                     data = {this.state.graphData}
//                     width = {1580}
//                     height = {1420}
//                     options = {{
//                         maintainAspectRatio: true,
//                         responsive: true,
//                     }}
//                 />
//             </div>
//         )
//     }
// }

// export default EnergyGraph;