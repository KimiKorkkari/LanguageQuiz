import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';

export default function Pickers(props) {
  console.log("props saved: ", props.saved)
  return (
    <View>
      <Text style={styles.textStyle}>Select the main language</Text>  
      <Picker
        selectedValue={props.main}
        onValueChange={(itemValue, itemIndex) =>
          props.setmain(itemValue)}>
        <Picker.Item label="Finnish" value="fi" />
        <Picker.Item label="English" value="en" />
        <Picker.Item label="France" value="fr" />
        <Picker.Item label="Italy" value="it" />
      </Picker>
      <Text style={styles.textStyle}>Select the secondary language</Text>  
      <Picker
        selectedValue={props.sec}
        onValueChange={(itemValue, itemIndex) =>
            props.setsec(itemValue)}>
        <Picker.Item label="Finnish" value="fi" />
        <Picker.Item label="English" value="en" />
        <Picker.Item label="France" value="fr" />
        <Picker.Item label="Italy" value="it" />
      </Picker>
      <TouchableOpacity onPress={() => props.start() }>
          <View style={styles.startButton}>
          <Text style={styles.textStyle}>Start a new game</Text>
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
