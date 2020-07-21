import React from "react";

import Chart from "chart.js";
import "chartjs-adapter-date-fns";
import {format} from "date-fns";
import { Canvas , StyleSheet} from '@react-pdf/renderer';
import { Image as ImagePDF } from '@react-pdf/renderer' 
class Grafica extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        // this.canvas = document.createElement('canvas');
    }
    styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          //backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 40,
          flexGrow: 1
        },
        time:{
          margin: 10,
          fontSize: 30,
          fontFamily: 'Helvetica',
        },
        text:{
          margin: 10,
          fontSize: 22,
          fontFamily: 'Helvetica',
        },
        canvas:{
          height: 400,
          width : 400
        }
      });

    componentDidMount() {
        console.log('presiones',this.props.presionEntrada,this.props.presionSalida)
        let ctx = this.canvas.getContext("2d");//this.canvasRef.current.getContext("2d");

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
        console.log(this.canvas.toDataURL());
        return(
            <ImagePDF src={this.props.data} cache={false} style={{ width: 100, height: 100 }}/>
            // <Image src={{ data: this.canvas.toDataURL('image/jpeg', 1.0).substr(21), format: 'jpeg'}} style={{width: 500, height: 500}}/>
        );
    }
}

export default Grafica;