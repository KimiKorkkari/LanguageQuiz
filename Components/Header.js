import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
const { width: width, height: height } = Dimensions.get("window");

export default function Header(props) {


  return (
    <View style={{ width:width, height:height/5,  flexDirection:"row",
    justifyContent:"center",
    flexWrap:"wrap",}}>
      <View style={styles.quitText}>
        <TouchableOpacity onPress={() => props.funktio() } >
          <Text>Quit and Save</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.result}>
        <Text>Complete: {props.perc}%</Text> 
      </View>
      
      <View style={styles.header}>
        <Text style={{fontSize:30, fontWeight:"bold"}}>KieliVisa</Text>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  result:{
    
    paddingLeft:width/5,
    justifyContent:"center",
    width:width/2,
    height:height/20,
    marginLeft:width/4.5
  },
  header:{
    width:width,
    height:height/8,
    justifyContent:"center",
    alignItems:"center",
  },
  quitText:{
    borderWidth:2,
    padding:3,
    justifyContent:"center",
    width:width/3.8,
    height:height/20,
    
  },
});