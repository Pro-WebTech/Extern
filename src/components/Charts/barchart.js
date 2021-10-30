import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: "60"
        }
    }

    render() {
        const { height } = Number(this.state) ; 
        const option = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.6,
                    display: false,
                }],
                yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ]
            }
        }

        return (
            <React.Fragment>
                <Bar height = {height} data = {this.props.data}options={option} />
            </React.Fragment>
        );
    }
}

export default BarChart;   