import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 40,
    flexGrow: 1
  },
  time:{
    margin: 10,
    fontSize: 22,
    fontFamily: 'Helvetica',
  },
  text:{
    margin: 10,
    fontSize: 22,
    fontFamily: 'Helvetica',
  }
});
const textStule = StyleSheet.create(
  {
    
  margin: 10,
  fontSize: 22,
  fontFamily: 'Helvetica',

  }
);
// Create Document Component
function MyDocument(props){
    console.log(props)

  let ficha = props.ficha.map(ficha => {
    let defuncion
    let alta
    if(ficha.fechaDefuncion != null){
      defuncion = <Text style={styles.text}>Fecha Defuncion: {ficha?.fechaDefuncion}</Text>
      
    }
    if(ficha.fechaAlta != null){
      alta = <Text style={styles.text}>Fecha Defuncion: {ficha?.fechaAlta}</Text>
      
    }
    return (
    <>
    <Text style={styles.time}>{ficha?.timestamp}</Text> 
    <Text style={styles.text}>{ficha?.detalles}</Text>
    <Text style={styles.text}>Medico Tratante: {ficha?.medicoTratante}</Text> 
    <Text style={styles.text}>Nivel de Riesgo: {ficha?.nivelDeRiesgo}</Text>
    <Text style={styles.text}>Internacion: {ficha?.internacion}</Text>
    {alta}
    {defuncion}
    <Text style={styles.text}>--------------------------------------------------------------------</Text>
    </>
    )
})
  return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {ficha}
        
      </View>
    </Page>
  </Document>
)
}

function pdf(props){
  
    return MyDocument(props)
}

export default pdf;