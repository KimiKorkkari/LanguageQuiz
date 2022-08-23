import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Answers from './Answers';
import Question from './Question';
import Quit from "./Header";
import Speech from "./Speech";
import datajson from "../assets/uusi3.json";

const { width: widht, height: height } = Dimensions.get("window");

export default function Quiz(props) {
  
  //console.log(props.data.data)
  //Mieti miten se gamedata saadaan välitettyä suoraan tähän, ilman näitä? Vai pitääkö nämäkin propsata
 
  const [gameData, setGameData] = useState(props.gameData)
  const [LanguageMain, setLanguageMain] = useState(props.LanguageMain)
  const [LanguageSecondary,setLanguageSecondary] = useState(props.LanguageSecondary)
  const [speechVoice, setSpeechVoice] = useState(props.speechVoice)
  const [speechLanguage, setSpeechLanguage] = useState(props.speechLanguage)
  const [numberOfdata, setNumberOfData] = useState(props.numberOfdata) //Tässä laskuri, montako kyyyssäriä otettu isosta datasta
  const [result, setResult] =useState(props.result)
  const [count, setcount] = useState(props.count); 

  const [languageVoices, setLanguageVoices] = useState([{voice: "fi-FI",language:"fi-FI-SMTf00"}, {voice: "en-EN",language: "en-GB-SMTf00"}, {voice: "fr-FR",language:"fr-FR-SMTf00"}, {voice: "it-IT",language:"it-IT-SMTf00"}])
  
  const [nextQavaible, setnextQavaible] = useState(false)
  const [rightButton, setRightButton] = useState(styles.buttonright)
  const [wrongButton, setWrongButton] = useState(styles.buttonwrong)
  const [defaultButton, setDefaultButton] = useState(styles.button)
  const [colorschangeavailable, setColorschangeavailable] = useState(false)
  const [chosenButton, setChosenButton] = useState(10)

  const [question, setQuestion] = useState(props.gameData[0][LanguageMain])
  const [rightAnswer, setRightAnswer] = useState(props.gameData[0][LanguageSecondary]) 
  const [answer1, setanswer1] = useState(props.gameData[0][LanguageSecondary])
  const [answer2, setanswer2] = useState(props.gameData[1][LanguageSecondary])
  const [answer3, setanswer3] = useState(props.gameData[2][LanguageSecondary])
  const [answer4, setanswer4] = useState(props.gameData[3][LanguageSecondary])
  const [answers, setAnswer] = useState([{"answer":answer1, "index":1},{"answer":answer2, "index":2},
                                         {"answer":answer3, "index":3},{"answer":answer4, "index":4}]);

  useEffect(() => {
  setAnswer([{"answer":answer1, "index":1},{"answer":answer2, "index":2},
  {"answer":answer3, "index":3},{"answer":answer4, "index":4}])  
  }, [question]) 

  useEffect(() => {
    setSounds()
  }, []) 

  const setSounds = () => {
 
   
    //console.log(LanguageSecondary)
    if (LanguageSecondary == "fi"){
      setSpeechLanguage(languageVoices[1].language) //No nää nyt ei suomeks toimi, mutta ohitetaan se kun en jaksa enää poistaakkaan
      setSpeechVoice(languageVoices[1].voice)
    }
    else if (LanguageSecondary == "en"){
      setSpeechLanguage(languageVoices[1].language)
      setSpeechVoice(languageVoices[1].voice)
    }
    else if (LanguageSecondary == "fr"){
      setSpeechLanguage(languageVoices[2].language)
      setSpeechVoice(languageVoices[2].voice)
    }
    else if (LanguageSecondary == "it"){
      setSpeechLanguage(languageVoices[3].language)
      setSpeechVoice(languageVoices[3].voice)
    }
   
  }

  const shuffleOptions = () => {
    
    var order = [count]; 
    while(order.length < 4){
    var r = Math.floor(Math.random() * 29) + 1;
    if(order.indexOf(r) === -1) order.push(r);
    }
    order.sort(() => Math.random() - 0.4) //Vastauspaikat pitää vaihtaa, että tyyliin oikeavastaus ei aina ole ekana
    return (order)
  }


  const changeQuestion = () => {
    
   
    setColorschangeavailable(false)
    setChosenButton(10)
    //resetcolors() 
    setnextQavaible(false)
    var order = shuffleOptions()
    setQuestion(gameData[count][LanguageMain]);
    setRightAnswer(gameData[count][LanguageSecondary]);
    setanswer1(gameData[order[0]][LanguageSecondary]); 
    setanswer2(gameData[order[1]][LanguageSecondary]);
    setanswer3(gameData[order[2]][LanguageSecondary]);
    setanswer4(gameData[order[3]][LanguageSecondary]); 
    
  }

  
  const checkAnswer = (e,index,answer) => {
    setColorschangeavailable(true)
    setChosenButton(index)
   
     //console.log(answer) //Vastaus vaihtoehto
     if (answer == rightAnswer){
         
         props.calculate(result)
         setResult(result+1)
         gameData[count].points +=1 
         if (gameData[count].points == 3){ 
          //Tähänhän olisi hyvä tehdä joku algoritimi, joka palauttelee kyssäreitä välillä ns. kertauksen omaisesti, mutta ehkä toisessa versiossa...
            setNumberOfData(numberOfdata+1)
         
          //Ja lisätään uus kyssäri kiertoon, jos isossa datassa on viellä kyssäreitä
          if (numberOfdata+1 < datajson.length){
            gameData.splice(count, 1);
            gameData.push(datajson[numberOfdata+1])
          }
        }
        if (count == 29) {setcount(0), gameData.sort(() => Math.random() -0.5),setnextQavaible(true) 
      
     } else{
      setcount(count+1)
      console.log("Oikein!")
      setTimeout(() => {
        setnextQavaible(true)
      }, 1000); 
      }
    }else {
        if (count == 29 ) {setcount(0), gameData.sort(() => Math.random() -0.5),setnextQavaible(true)}
        else{
          setcount(count+1)
          console.log("Väärin!")
          setTimeout(() => {
            setnextQavaible(true)
          }, 1000);
        }
      }
    }


    const getButtonsColors = (index, ans) => {
      
     
      if (colorschangeavailable == true){

        if (chosenButton == 1){
          if (ans.index == chosenButton && ans.answer == rightAnswer){
            return (rightButton)
          }
          else if (ans.index == chosenButton && ans.answer != rightAnswer){
            return (wrongButton)
          }
        }
        else if (chosenButton == 2){
          if (ans.index == chosenButton && ans.answer == rightAnswer){
            return (rightButton)
          }
          else if (ans.index == chosenButton && ans.answer != rightAnswer){
            return (wrongButton)
          }
        }
        else if (chosenButton == 3){
          if (ans.index == chosenButton && ans.answer == rightAnswer){
            return (rightButton)
          }
          else if (ans.index == chosenButton && ans.answer != rightAnswer){
            return (wrongButton)
          }
        }
        else if (chosenButton == 4){
          if (ans.index == chosenButton && ans.answer == rightAnswer){
            return (rightButton)
          }
          else if (ans.index == chosenButton && ans.answer != rightAnswer){
            return (wrongButton)
          }
        }
        //Jos nappi ei ole oikea, palauta oikea nappi. ELi jos nappi on oike, mutta sitä ei ole painettu, palauta oikea.
        if (ans.answer == rightAnswer && chosenButton != ans.index){
          return (rightButton)
        }

      }
       return (defaultButton)
    
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Quit funktio={props.quit} perc={props.percents}/>
      </View>
      
      
        <View style={styles.question}>
          <Question question={question} />
        </View> 

        <View style={styles.main}>
          <View style={styles.leftside}>
            {answers.map((alkio, index) => <Answers key={index} paikka={alkio.index} ans={alkio.answer} buttons={getButtonsColors(index,alkio)} funktio={checkAnswer} />) }
          </View>
          <View style={styles.rightside}>
            {answers.map(alkio => <Speech key={alkio.index} ans={alkio.answer} speech={speechVoice} lan={speechLanguage} />) }
          </View> 
        </View>
   
      <View style={styles.footer}>
        <TouchableOpacity style={{width:200, height:70,}}onPress={() => changeQuestion() }>
          {nextQavaible ? (<Text style={styles.textNext}>The next question</Text>) : null }  
        </TouchableOpacity> 
      </View>

   </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:widht,
    height:height,
    backgroundColor:"#F9F7F5",
    marginTop:-50,
   
  },
  header:{
    height:height/5,
    width:widht,
  },
  question:{
    height:height/10,
    width:widht,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,
  },
  main: {
    height:height/2.5,
    width:widht,
    flexDirection:"row",
    justifyContent:"center",
    flexWrap:"wrap",
  },

  leftside:{
    height:height/2.5,
    width:widht/1.3,
  },
  rightside:{
    height:height/2.5,
    width:widht/4.5,
  },
  
  textNext:{
    borderWidth:5,
    paddingTop:5,
    fontSize:20,
    textAlign:"center",
    marginBottom:-50,
    marginTop:10
  },
  button: {
    backgroundColor:"white",
    marginTop:5,
    width:widht/1.3,
    height:height/11,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 3,
    borderRadius: 5,
  },
  buttonright: {
    backgroundColor: 'green',  
    marginTop:5,
    width:widht/1.3,
    height:height/11,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 3,
    borderRadius: 5, 
  },
  buttonwrong: {
    backgroundColor: 'red',
    marginTop:5,
    width:widht/1.3,
    height:height/11,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 3,
    borderRadius: 5,
  },
});
