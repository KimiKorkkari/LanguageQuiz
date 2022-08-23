
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
const { width: widht, height: height } = Dimensions.get("window");

export default function Answers(props) {

  return (
        
          <TouchableOpacity key={props.paikka} onPress={(e) => props.funktio(e,props.paikka, props.ans) }>
            <View style={props.buttons}>
              <Text style={{fontSize:20}} >{props.ans}</Text>
            </View>
          </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  
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
 
});
