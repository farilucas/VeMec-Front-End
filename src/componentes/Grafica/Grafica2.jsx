import React from "react";

import Chart from "chart.js";
import "chartjs-adapter-date-fns";
import {format} from "date-fns";

class Grafica2 extends React.PureComponent {
    constructor(props) {
        super(props);
        if (props.canvasRef) {
            this.canvasRef = props.canvasRef;
        }
        else {
            this.canvasRef = React.createRef();
        }
    }

    componentDidMount() {
        let ctx = this.canvasRef.current.getContext("2d");

        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    label: "Actividad cardiaca",
                    borderColor: "#00FF00",
                    backgroundColor: "#00FF00",
                    fill: false,
                    data: this.props.bpm
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: this.props.timeUnit || "second",
                            tooltipFormat: this.props.tooltipFormat || "dd-MM-yyyy HH:mm:ss SSS'ms'",
                        },
                        ticks: {
                            callback(value, index, values) {
                                let date = values[index].value;
                                return format(date, "dd-MM-yyyy HH:mm:ss");
                            },
                        },
                        scaleLabel: {
                            labelString: "Tiempo",
                            display: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                        },
                        scaleLabel: {
                            labelString: `Latidos`,
                            display: true,
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 3,
                    }
                }
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.chart.data.datasets[0].data = this.props.bpm;
        this.chart.update();
    }

    render() {
        return(
            <canvas ref={this.canvasRef}/>
        );
    }
}

export default Grafica2;