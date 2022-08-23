
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function Question(props) {
  
  return (
  
      <Text style={{fontSize:32}}>{props.question}</Text>
   
  )
}
