import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Quiz from "./Components/Quiz";
import Pickers from './Components/Pickers';
import datajson from "./assets/uusi3.json";
import LoadGame from "./Components/Load";
export default function App() {
  const [quizOn, setQuizOn] = useState(false)
  const [data, setData] = useState(datajson)
  const [gameData, setGameData] = useState([])
  const [LanguageMain, setLanguageMain] = useState("fi")
  const [LanguageSecondary,setLanguageSecondary] = useState("fi")
  const [showPickers, setShowPickers] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [saved, setSaved] = useState()
  const [speechVoice, setSpeechVoice] = useState()
  const [speechLanguage, setSpeechLanguage] = useState()
  const [numberOfdata, setNumberOfData] = useState(30) //Tässä laskuri, montako kyyyssäriä otettu isosta datasta
  const [result, setResult] =useState()
  const [percents, setpercents] =useState(0.00)
  const [count, setcount] = useState(0); 
 

  useEffect(() => {

    loadData()  
    }, []) 
  

  const loadData = async () =>{
    try {
        const value = await AsyncStorage.getItem('@LoadGame')
        const temp = JSON.parse(value)
        const indexInt = parseInt(temp.index,10)
        const resultInt = parseInt(temp.complete,10)
        const precentInt = parseInt(temp.precent,10)
     
        if(value !== null) {
          console.log("Hakee dataa")
          setSaved(true)
          setGameData(temp.datas);
          setLanguageMain(temp.langmain);
          setLanguageSecondary(temp.langsec);
          setSpeechVoice(temp.speechvoice);
          setSpeechLanguage(temp.speechlang);
          setNumberOfData(indexInt);
          setResult(resultInt)
          setpercents(precentInt)
          
        }
      } catch(e) {
        console.log("tuli lataan datan")
        setSaved(false)
        setResult(0)
        setpercents(0.000)
        for(let i = 0; i < 30; i++){
          gameData.push(data[i])
           //Jos tallennusta ei ole, nykästää isosta kyssäridatasta pelikiertoon 30 kyssäriä
          }
        
      }
  }
  const storeData = async () => {
    try {
      console.log("tallentaa")
      const values = {datas: gameData, langmain: LanguageMain, langsec: LanguageSecondary, speechvoice:speechVoice, speechlang:speechLanguage, index:numberOfdata, complete:result, precent:percents }
      await AsyncStorage.setItem('@LoadGame', JSON.stringify(values));
    } catch (e) {
      console.log("Ei onnannu tallentaa")
    }
  }

  const StartQuiz = () => {
    if (saved){
      resetGame()
    }else{
      setShowPickers(false) 
      setShowQuiz(true)
      setQuizOn(true)}
    }
   
  
  const QuitQuiz = () => {
    storeData()
    setShowPickers(true) 
    setShowQuiz(false)
    setSaved(true)
    setQuizOn(false)
    
  }
  const ResumeGame = () =>{
    setShowPickers(false) 
    setShowQuiz(true)
    setQuizOn(true)
    
  }
  const resetGame = () => {
    resetMemoryAsync()
    setSaved(false)
    setLanguageMain("fi")
    setLanguageSecondary("fi")
    setShowPickers(true) 
    setShowQuiz(false)
    loadData()

  }
  
  const resetMemoryAsync = async () => {
   
    try {
     await AsyncStorage.removeItem("@LoadGame");
     console.log("Tyhjensi")
   }
     catch(exception) {
      console.log("Ei tyhjennys onnistunut")
   }
   }
   const calculatePercentages = (r) => {
    setResult(r+1)
    setpercents((r/(2993*3)*100).toFixed(2))
  }

  return (
    <View style={styles.container}>
        {showPickers  & !saved ? <Pickers 
          main={LanguageMain} 
          sec={LanguageSecondary} 
          saved={saved}
          setmain={setLanguageMain} 
          setsec={setLanguageSecondary} 
          start={StartQuiz}/> : null }
        
        {saved & !quizOn? <LoadGame newgame={StartQuiz} resume={ResumeGame}/> : null }
                  
        {showQuiz ? <Quiz 
            speechVoice={speechVoice}
            speechLanguage={speechLanguage}
            numberOfdata={numberOfdata}
            result={result}
            percents={percents}
            gameData={gameData}
            count={count}
            quit={QuitQuiz}
            calculate={calculatePercentages}
            LanguageMain={LanguageMain}
            LanguageSecondary={LanguageSecondary}/> : null }

      <StatusBar style="auto" />
    </View>
  );
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
