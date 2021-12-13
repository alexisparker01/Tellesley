import React, {useState, useEffect, useContext, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, Button, Image, Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './NewPostButton';
import SignUpScreen from './SignUpScreen';
import { initializeApp } from "firebase/app";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        sendEmailVerification,
        signOut } from "firebase/auth";
import { MakePost } from './MakePost';
import NavigationBar from './NavigationBar';
import { LoginScreen } from './login';
import StateContext from './StateContext.js';

const testMessages = 
[
 {'user': 'km1@wellesley.edu',
 'date': new Date(2021, 10, 29, 13, 12, 46, 1234),
  'fName': 'Kate',
  'lName': 'MacVicar', 
  'password': 'kateamacv',
  'posts': 'Is there no hot water for anyone else in Shafer?',
  'category': 'Life'
 },
 {'user': 'hz4@wellesley.edu',
 'date': new Date(2021, 9, 25, 13, 12, 47, 1234),
 'fName': 'Hope',
 'lName': 'Zhu', 
 'password': 'hopezhu',
 'posts': 'Anyone want to take a walk around the lake?',
 'category': 'Life'
},
{'user': 'ap7@wellesley.edu',
'date': new Date(2021, 10, 30, 17, 33, 52, 1234),
'fName': 'Alexis',
'lName': 'Parker', 
'password': 'alexisparker',
'posts': 'has anyone taken CS235 before? Thoughts?',
'category': 'Classes'
},
]

const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];
 
function formatDateTime(date) {
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
}

const MessageItem = props => { 
  return (
  <View style={styles.postContainer}>
    <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
    <Text style={styles.messageAuthor}>{props.message.author}</Text>
    <Text style={styles.messageContent}>{props.message.content}</Text>
  </View> 
); 
}

export const Feed = ({navigation}) => {
  const loggedInProps = useContext(StateContext);

  // State for chat channels and messages
  const [category,setCategory] = useState(categories);
  const [selectedCategory, setSelectedCategory] = React.useState('Classes');
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [localMessageDB, setLocalMessageDB] = useState(testMessages.map( addTimestamp ));

  const [state, setState] = useState ({
      mapIcon: 'https://cdn-icons-png.flaticon.com/512/149/149442.png', 
      feedIcon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      profileIcon: 'https://cdn-icons-png.flaticon.com/512/64/64572.png',
  })

  function addTimestamp(message) {
    return {...message, timestamp:message.date.getTime()}
  } 

   useEffect(
    () => { 
      getMessagesForCategory(selectedCategory); 
      setTextInputValue('');
    },
    [selectedCategory]
  ); 


  async function getMessagesForCategory(cat) {
    setSelectedMessages(localMessageDB.filter( msg => msg.category === cat));
    //console.log(msg);
  }

    // Returns a promise to add message to firestore
    async function addMessageToDB(message) {
      const timestamp = message.date.getTime(); // millsecond timestamp
      const timestampString = timestamp.toString();

      // Add a new document in collection "messages"
      return setDoc(doc(db, "messages", timestampString), 
        {
          'timestamp': timestamp, 
          'author': message.user, 
          'channel': message.category, 
          'content': message.post, 
        }
      );
  }

  
    return ( 

    <View style={styles.container}>
    
    {/* upper white section */}
      <View style = {styles.header}>
      <Text style={{fontSize: 15, alignItems: 'right'}}> Welcome, {loggedInProps.FName}! </Text>
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
        {(selectedMessages.length === 0) ? 
         <Text>No messages to display</Text> :
         <FlatList style={styles.messageList}
            data={selectedMessages} 
            renderItem={ datum => <MessageItem message={datum.item}></MessageItem>} 
            keyExtractor={item => item.timestamp} 
            />
        }
        </View>
        <View style = {styles.postContainer}>

        </View>
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
,
messageList: {
  width:'90%',
  marginTop: 5,
},
messageItem: {
  marginTop: 5,
  marginBottom: 5,
  backgroundColor:'bisque',
  color:'black',
  borderWidth: 1,
  borderColor: 'blue',
},
messageDateTime: {
  paddingLeft: 5,
  color:'gray',
},
messageAuthor: {
  paddingLeft: 5,
  color:'blue',
},
messageContent: {
  padding: 5,
  color:'black',
},
});