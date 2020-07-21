import React from 'react';
import { Page, Text, View, Document, StyleSheet, Canvas, Image } from '@react-pdf/renderer';
import GraficaPresion from './grafica'


const styles = StyleSheet.create({
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

const fakeFetch
         ={
            puntos: {
                puntosPresionEntrada: [
                    {
                        x: "2020-07-20T02:36:00.187",
                        y: 99
                    }
                ],
                puntosPresionSalida: [
                    {
                        x: "2020-07-20T02:36:00.187",
                        y: 99
                    }
                ],
                puntosBpm: [
                    {
                        x: "2020-07-20T02:36:00.187",
                        y: 99
                    }
                ]
            }
        }

function MyDocument(props){
 
  function simpleDate(isoDate){
    let formatedDate;
    var date = new Date(isoDate);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    
    formatedDate = dt +'/' + month + '/'+ year + '-' + hour + ':' + minutes + ':' + seconds
    return formatedDate
  }
  let ficha

  if(props.ficha != null){
   ficha = props.ficha.map((ficha, index) => {
    let defuncion
    let alta
    if(ficha.fechaDefuncion != null){
      defuncion = <Text style={styles.text}>Fecha Defuncion: {simpleDate(ficha?.fechaDefuncion)}</Text>
      
    }
    if(ficha.fechaAlta != null){
      alta = <Text style={styles.text}>Fecha Alta: {simpleDate(ficha?.fechaAlta)}</Text>
     
    }
   
    return (
    <>
      <Page key={index + index} size="A4" style={styles.page}>
        <View key={index} style={styles.section}>
        <Text style={styles.time}>{simpleDate(ficha?.timestamp)}</Text> 
        <Text style={styles.text}>{ficha?.detalles}</Text>
        <Text style={styles.text}>Medico Tratante: {ficha?.medicoTratante}</Text> 
        <Text style={styles.text}>Nivel de Riesgo: {ficha?.nivelDeRiesgo}</Text>
        <Text style={styles.text}>Internacion: {ficha?.internacion}</Text>
        
        {alta}
        {defuncion}
        <Text style={styles.text}>------------------------------------------------------------------</Text>
        
      </View>
    </Page>
    </>
    )

})

ficha.push(
      <>
      <Page key={ 999} size="A4" style={styles.page}>
      
        <View key={99} style={styles.section}>
        {/* <GraficaPresion presionEntrada={fakeFetch.puntos.puntosPresionEntrada} presionSalida={fakeFetch.puntos.puntosPresionSalida}/> */}
        
        <Image src={props.dataPresion} style={{ width: "100%" }}/>
        <Image src={props.dataBpm} style={{ width: "100%"}} />
        
        
        <Text style={styles.text}>------------------------------------------------------------------</Text>
      
      </View>
    </Page>
    </>
)

  }

  else{
    ficha=
    <>
    <Page key={2} size="A4" style={styles.page}>
      <View key={1} style={styles.section}>
        <Text style={styles.text}>------------------------------------------------------------------</Text>
      </View>
    </Page>
    </>
    
  }

  let antecedentes
  let datosIniciales
  if(props.paciente.antecedentes !== null){
    antecedentes =  <Text style={styles.text}>Antecendents:{props.paciente.antecedentes}</Text>
  }
  else(
    antecedentes =  <Text style={styles.text}>Antecendents: no tiene</Text>
  ) 

  datosIniciales =
    <Page key={9999999} size="A4" style={styles.page}>
      <View key={99999} style={styles.section}>
      <Text style={styles.text}>Nombre:{props.paciente.nombre}</Text>
      <Text style={styles.text}>Sexo:{props.paciente.sexo}</Text>
      <Text style={styles.text}>{simpleDate(props.paciente.fechaIngreso)}</Text>
      {antecedentes} 
      <Text style={styles.text}>Docuemento:{props.paciente.documento}</Text>
      <Text style={styles.text}>Nacionalidad: {props.paciente.nacionalidad}</Text> 
      <Text style={styles.text}>Telefono: {props.paciente.telefono}</Text>
      <Text style={styles.text}>Email: {props.paciente.email}</Text>
      <Text style={styles.text}>Departamento: {props.paciente.departamento}</Text>
      <Text style={styles.text}>Localidad: {props.paciente.localidad}</Text>
      <Text style={styles.text}>Direccion: {props.paciente.direccion}</Text>
    
      <Text style={styles.text}>------------------------------------------------------------------</Text>
    
    </View>
  </Page>
  return(
    
    
  <Document>
        {datosIniciales}
        {ficha}
        
      
  </Document>
  
)
}

function pdf(props){
  
    return MyDocument(props)
}

export default pdf;