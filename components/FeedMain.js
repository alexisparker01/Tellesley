import React, {useState, useEffect, useContext } from 'react';
import { FlatList, Button, Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './newPostButton';
import { collection, doc, setDoc,
          query, where, getDocs} from "firebase/firestore";
import { MakePost } from './makePost.js';
import NavigationBar from './NavigationBar.js';
import StateContext from './StateContext.js';

const testMessages = 
[
 {'user': 'km1@wellesley.edu',
 'date': new Date(2021, 10, 29, 13, 12, 46, 1234),
  'post': 'Is there no hot water for anyone else in Shafer?',
  'category': 'Life'
 },
 {'user': 'hz4@wellesley.edu',
 'date': new Date(2021, 9, 25, 13, 12, 47, 1234),
 'post': 'I wish we could be done with finals now...',
 'category': 'Life'
},
{'user': 'ap7@wellesley.edu',
'date': new Date(2021, 10, 30, 17, 33, 52, 1234), 
'post': 'has anyone taken CS235 before? Thoughts?',
'category': 'Classes'
},
]


const testProfiles = [
  {
    'user': 'km1@wellesley.edu',
    'FName': 'Kate',
    'LName': 'MacVicar'
  },
  {
    'user': 'ap7@wellesley.edu',
    'FName': 'Alexis',
    'LName': 'Parker'
  },
  {
    'user': 'hz4@wellesley.edu',
    'FName': 'Hope',
    'LName': 'Zhu'
  },
]

 
function formatDateTime(date) {
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
}

const MessageItem = props => { 
  return (
  <View style={styles.postContainer}>
    <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
    <Text style={styles.messageAuthor}>{props.message.user}</Text>
    <Text style={styles.messageContent}>{props.message.post}</Text>
    <TouchableOpacity><Button style={styles.delButton}>Delete</Button></TouchableOpacity>

  </View> 
); 
}

export const Feed = ({navigation}) => {
  const loggedInProps = useContext(StateContext);

  // State for chat channels and messages
  //const [category,setCategory] = React.useState(loggedInProps.categories);
  const [selectedCategory, setSelectedCategory] = React.useState('Classes');
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  //const [localMessageDB, setLocalMessageDB] = useState(testMessages.map( addTimestamp ));
  const [useFirestore, setUseFirestore] = useState(selectedMessages.map( addTimestamp));

  function addTimestamp(message) {
    return {...message, timestamp:message.date.getTime()}
  } 


useEffect(
  () => { 
    getMessagesForCategory(selectedCategory); 
    setTextInputValue('');
  },
  [selectedCategory, useFirestore]
); 

function docToMessage(msgDoc) {
  // msgDoc has the form {id: timestampstring, 
  //                   data: {timestamp: ..., 
  //                          author: ..., 
  //                          channel: ..., 
  //                          content: ...}
  // Need to add missing date field to data portion, reconstructed from timestamp
  console.log('docToMessage');
  const data = msgDoc.data();
  console.log(msgDoc.id, " => ", data);
  return {...data,  date: new Date(data.timestamp)}
}

async function firebaseGetAllMessages(){
  const q = query(collection(loggedInProps.db, 'messages'));
  const querySnapshot = await getDocs(q);
  let messages = []; 
  querySnapshot.forEach(doc => {
      messages.push(docToMessage(doc));
  });
  setSelectedMessages(messages);
}

async function firebaseGetMessagesForCategory(cat) {
  const q = query(collection(loggedInProps.db, 'messages'), where('category', '===', cat));
  const querySnapshot = await getDocs(q);
  let messages = []; 
  querySnapshot.forEach(doc => {
      messages.push(docToMessage(doc));
  });
  setSelectedMessages(messages);
}

async function getMessagesForCategory(cat) {
  if (cat !== 'All') {
    firebaseGetMessagesForCategory(cat);
}else{
    firebaseGetAllMessages();
}
}

  async function populateFirestoreDB(messages) {

    // Returns a promise to add message to firestore
    async function addMessageToDB(message) {
      const timestamp = message.date.getTime(); // millsecond timestamp
      const timestampString = timestamp.toString();
  
      // Add a new document in collection "messages"
      return setDoc(doc(loggedInProps.db, "messages", timestampString), 
        {
          'timestamp': timestamp, 
          'user': message.user, 
          'category': message.category, 
          'post': message.post, 
        }
      );
    }
  
        // Peform one await for all the promises. 
        await Promise.all(
          messages.map( addMessageToDB ) 
        );
  }


    return ( 

    <View style={styles.container}>
    {/* remove arrow going back to login page -> change to "logout" button */}
    {/* upper white section */}
      <View style = {styles.header}>
      <Text style={{fontSize: 15, alignItems: 'right'}}> Welcome, {loggedInProps.FName}! </Text>
      </View>

      {/*The footer is the gray part, but its height doesn't extend for
      some reason? The amount of gray is static and I don't know how to fix it. */}
      <View style = {styles.footer}>
        <NewPostButton
                        color= 'rgb(8,58,129)' 
                        onPress={() => navigation.navigate('New Post')}
                        ><Text style = {styles.buttonText}>New Post</Text></NewPostButton>
        <Text style = {styles.subTitleText}> Recent Activity </Text>
        <Picker
          style={styles.pickerStyles}
          mode='dropdown'
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
          {loggedInProps.categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
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
    backgroundColor: 'white',
    borderColor: 'rgb(222,222,222)',
    borderWidth: 2,
    fontSize: 18,
    paddingTop:10,
    paddingBottom:10,
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
    width:'100%',
    marginBottom: 10,
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
  width:'100%',
  marginTop: 5,
  marginBottom:5,
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
  marginBottom: 3,
  fontSize: 14,
  color:'gray',
},
messageAuthor: {
  paddingLeft: 5,
  paddingBottom: 3,
  fontSize: 14,
  color:'rgb(8,58,129)',
},
messageContent: {
  paddingLeft: 10,
  paddingBottom: 3,
  padding:5,
  fontSize: 15,
  color:'black',
},
buttons: {
  backgroundColor: "rgb(8,58,129)",
  marginBottom: 15,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  padding: 5,
  width: '50%',
},
buttonText: {
   color: 'white',
   textAlign:'center',
},
});