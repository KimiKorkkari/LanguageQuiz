import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, {useState, useEffect} from 'react';


export default function Load(props) {

 

  return (
    <View>
    <TouchableOpacity onPress={() => props.resume() }>
      <View style={styles.startButton}>
        <Text style={styles.textStyle}>Resume Game</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.newgame() }>
    <View style={styles.startButton}>
      <Text style={styles.textStyle}>Start a new Game</Text>
    </View>
  </TouchableOpacity>
  </View>
        
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle:{  
      margin: 24,  
      fontSize: 20,  
      fontWeight: 'bold',  
      textAlign: 'center',  
    }, 
  });
