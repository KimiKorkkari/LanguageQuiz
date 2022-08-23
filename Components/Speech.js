import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Speechs from 'expo-speech';

export default function Speech(props) {

  const playSpeech = (ans,lan, speech) => {
    console.log(ans)
    console.log(lan)
    const thingToSay = ans;
    const options = {
        voice: speech,
        language: lan,
        pitch: 0.8
    }
    {Speechs.speak(thingToSay, options)}   //Tää suomi on automaatti, kun ei ollu speechissä tukea, joten aika heikohko
    };

  return (
 
      <TouchableOpacity style={{width:60, marginTop:13, marginBottom:2, marginLeft:15,marginRight:-60, height:60, }} onPress={(e) => playSpeech(props.ans, props.lan, props.speech) }>
        <Image  style={{width:60, marginTop:0, marginLeft:0, height:60}}source={require("../assets/play.png")}></Image>
      </TouchableOpacity>
        
  )
}
