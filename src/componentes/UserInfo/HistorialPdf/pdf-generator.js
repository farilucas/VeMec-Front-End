import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


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
  }
});


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
      alta = <Text style={styles.text}>Fecha Defuncion: {simpleDate(ficha?.fechaAlta)}</Text>
      
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
  return(
  <Document>
    
        {ficha}
        
      
  </Document>
)
}

function pdf(props){
  
    return MyDocument(props)
}

export default pdf;