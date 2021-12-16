import React from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Picker} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { loginStyle } from './loginStyle';

export const MakePost = ({navigation}) => {
// State for chat channels and messages
//const [selectedMessages, setSelectedMessages] = React.useState([]);
//const [textInputValue, setTextInputValue] = useState('');
const [isComposingMessage, setIsComposingMessage] = React.useState(false);
const [post, setTextInputValue] = React.useState('');
const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];
const [selectedCategory, setSelectedCategory] = React.useState('Classes');

function postMessage() {
  console.log(`postMessage; usingFirestore=${usingFirestore}`);
  const now = new Date();
  const newMessage = {
    author: loggedInUser.email, 
    date: now, 
    timestamp: now.getTime(), // millsecond timestamp
    category: selectedCategory, 
    content: textInputValue, 
  }

  if (usingFirestore) {
    firebasePostMessage(newMessage);
  } else {
    setLocalMessageDB([...localMessageDB, newMessage]);
    setIsComposingMessage(false);
  }
  setTextInputValue('');
}

function cancelButton() {
  navigation.navigate('Feed');
}

     return (

      <View style = {styles.container}>
      <SafeAreaView style = {styles.container}>
            <TextInput multiline = {true} numberOfLines = {20} editable style = {styles.textInputArea} maxLength={100} placeholder={"Dear Tellesley..."} onChangeText={text => setTextInputValue(text)}/>
              <Picker
                style={styles.pickerStyles}
                mode='dropdown'
                selectedValue= 'Select Category'
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
              </Picker>
                <Button mode = "contained" 
                       style = {styles.buttons} 
                      onPress={() => postMessage()}
                    ><Text style= {loginStyle.buttonText}> Post </Text></Button>
                <Button mode = "contained" style = {styles.subuttons} onPress={() => cancelButton()}><Text style= {loginStyle.buttonText}>Cancel</Text></Button>
      </SafeAreaView>
    </View>
     )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    backgroundColor: "rgb(8,58,129)",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '40%',
    width: '20%',
    padding: 5,
 },
 subuttons: {
  backgroundColor: "#919191",
  color:'#000000',
  marginLeft: '40%',
  width: '20%',
  padding: 5,

},
  textInputArea: {
    textAlign: 'left',
    backgroundColor: "white",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#9E9E9E",
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    color:'#5d5d5d',
    fontFamily: 'Times New Roman'
  },
  pickerStyles:{
    width:'37%',
    marginTop: 5,
    marginLeft: '30%',
    backgroundColor:'white',
    },
})