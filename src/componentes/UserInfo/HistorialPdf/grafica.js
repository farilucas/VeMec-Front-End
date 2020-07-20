import React from "react";

import Chart from "chart.js";
import "chartjs-adapter-date-fns";
import {format} from "date-fns";

class Grafica extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        let ctx = this.canvasRef.current.getContext("2d");

        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    label: "Presion de Entrada",
                    borderColor: "#FF0000",
                    backgroundColor: "#FF0000",
                    fill: false,
                    data: this.props.presionEntrada
                },
                {
                    label: "Presion de Salida",
                    borderColor: "#0000FF",
                    backgroundColor: "#0000FF",
                    fill: false,
                    data: this.props.presionSalida
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: "second",
                            tooltipFormat: "dd-MM-yyyy HH:mm:ss SSS'ms'",
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
                            labelString: `Presion ${this.props.unit}`,
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
        this.chart.data.datasets[0].data = this.props.presionEntrada;
        this.chart.data.datasets[1].data = this.props.presionSalida;
        this.chart.update();
    }

    render() {
        fakeFetch ={
            "puntos": {
                "puntosPresionEntrada": [
                    {
                        "x": "2020-07-20T02:36:00.187",
                        "y": 99
                    }
                ],
                "puntosPresionSalida": [
                    {
                        "x": "2020-07-20T02:36:00.187",
                        "y": 99
                    }
                ],
                "puntosBpm": [
                    {
                        "x": "2020-07-20T02:36:00.187",
                        "y": 99
                    }
                ]
            }
        }
        return(
            <canvas ref={this.canvasRef}/>
        );
    }
}

export default Grafica;