import React, {useState, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './newPostButton';
import SignUpScreen from './signUpScreen';
import { initializeApp } from "firebase/app";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        sendEmailVerification,
        signOut } from "firebase/auth";
import { MakePost } from './MakePost';
import NavigationBar from './NavigationBar';

const testMessages = 
[
 {'user': 'km1@wellesley.edu',
  'fName': 'Kate',
  'lName': 'MacVicar', 
  'password': 'kateamacv',
  'posts': 'Is there no hot water for anyone else in Shafer?',
  'category': 'Life'
 },
 {'user': 'hz4@wellesley.edu',
 'fName': 'Hope',
 'lName': 'Zhu', 
 'password': 'hopezhu',
 'posts': 'Anyone want to take a walk around the lake?',
 'category': 'Life'
},
{'user': 'ap7@wellesley.edu',
'fName': 'Alexis',
'lName': 'Parker', 
'password': 'alexisparker',
'posts': 'has anyone taken CS235 before? Thoughts?',
'category': 'Classes'
},
]
 
/* const MessageItem = props => { 
  return (
  <View style={styles.postContainer}>
    <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
    <Text style={styles.messageAuthor}>{props.message.author}</Text>
    <Text style={styles.messageContent}>{props.message.content}</Text>
  </View> 
); 
}

return ( */
const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];



export const Feed = ({navigation}) => {
   
/* const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];

  const [user, setUser] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  // State for chat channels and messages
  const [category,setCategory] = useState('Classes');
  const [selectedCategory, setSelectedCategory] = React.useState('Classes');
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [localMessageDB, setLocalMessageDB] = useState(testMessages.map(category ));

 async function getMessagesForCategory(cat) {
    setSelectedMessages(localMessageDB.filter( msg => msg.channel === chan));
  }
}
    useEffect(
      () => { 
        getMessagesForCategory(selectedCategory); 
        setTextInputValue('');
      },
      [selectedCategory]
    ); */ 

    const [category,setCategory] = useState('Classes');
    
    const [state, setState] = useState ({
      mapIcon: 'https://cdn-icons-png.flaticon.com/512/149/149442.png', 
      feedIcon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      profileIcon: 'https://cdn-icons-png.flaticon.com/512/64/64572.png',
   })
  
    return ( 

    <View style={styles.container}>
    
    {/* upper white section */}
      <View style = {styles.header}>
      <Text style={{fontSize: 15, alignItems: 'right'}}> Welcome, Wendy!</Text>
      <Image 
        style={styles.icons}
        source={{
          url: state.profileIcon,
        }}
      />
      </View>

      {/*The footer is the gray part, but its height doesn't extend for
      some reason? The amount of gray is static and I don't know how to fix it. */}
      <View style = {styles.footer}>
        <NewPostButton text="New Post" 
                        color= 'rgb(8,58,129)' 
                        onPress={() => navigation.navigate('New Post')}
        />
        <Text style = {styles.subTitleText}> Recent Activity </Text>
        <Picker
          style={styles.pickerStyles}
          mode='dropdown'
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
        </Picker>
        </View>
        <View style = {styles.postContainer}></View>
        <NavigationBar navigation = {navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  postContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    borderColor: 'rgb(222,222,222)',
    borderWidth: 2,
    fontSize: 18,
  },
    header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 6, 
    height: "100%",
    backgroundColor: 'rgb(237,237,237)',
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    paddingVertical: 50, 
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  titleText: {
    color: "rgb(6,12,51)",
    margin: 24,
    fontSize: 41,
    fontFamily: "Times New Roman",
    textAlign: 'center',
  },
  subTitleText: {
    margin: 24,
    fontSize: 25,
    fontFamily: "Times New Roman",
    textAlign: 'center'
  },
  pickerStyles:{
    width:'30%',
    backgroundColor:'white',
    },
    icons: {

      height: 10,
       width: 10,
       padding: 5,
       marginLeft: 40,
       resizeMode: 'cover', 
       //borderRadius: 400/2,
  
     }
});