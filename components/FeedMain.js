import React, {useState, useEffect, useContext } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Picker, Alert } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './newPostButton';
import { collection, doc, setDoc,
          query, where, getDocs} from "firebase/firestore";
import { MakePost } from './makePost.js';
import NavigationBar from './NavigationBar.js';
import StateContext from './StateContext.js';


export const Feed = ({navigation}) => {

const loggedInProps = useContext(StateContext);


/* const[count, setCount] = useState(0);
const likers = React.useState([]);
const [isLiked, setIsLiked] = useState(false); */

  function formatDateTime(date) {
    return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
  }
  
  const MessageItem = props => { 
    return (
    <View style={styles.postContainer}>
      <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
      <Text style={styles.messageCategory}>{props.message.category}</Text>
      <Text style={styles.messageAuthor}>{props.message.user}</Text>
      <Text style={styles.messageContent}>{props.message.post}</Text>
      {/* <TouchableOpacity style={styles.buttons}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity> */}
      <View style = {{flexDirection:'row', marginRight: 10}}>
{/*         <TouchableOpacity style={styles.likeButton}onPress = {like()}><Text>Like</Text></TouchableOpacity>
        <Text style = {styles.countStyle}> {count} </Text> */}
      </View>
    </View> 
  ); 
  }

  // State for chat channels and messages
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  console.log("the current catergory is: " + selectedCategory);
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [textInputValue, setTextInputValue] = useState('');
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
  messages.reverse();
  setSelectedMessages(messages);

}

async function firebaseGetMessagesForCategory(cat) {
  const q = query(collection(loggedInProps.db, 'messages'), where('category', '==', cat));
  const querySnapshot = await getDocs(q);
  let messages = []; 
  querySnapshot.forEach(doc => {
      messages.push(docToMessage(doc));
      console.log("this is the doc in cat firebase messages " + doc);
  });

  messages.reverse();
  setSelectedMessages(messages);
}

async function getMessagesForCategory(cat) {
  if (cat != 'All') {
    firebaseGetMessagesForCategory(cat);

}else{
    firebaseGetAllMessages();
}
}

function deleteMessage(message){
  console.log(message)
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

/*   function like(){
    if(!isLiked)
      //indexOf returns -1 if the element is not found in the array
      if(likers.indexOf(loggedInProps.loggedInUser.email) === -1){
        likers.push(loggedInProps.loggedInUser.email)
        setCount(count + 1);

      }else{
        //make it true to indicate the post is liked
        setIsLiked(!isLiked);
      }
    }  */
  

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
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>{
          loggedInProps.categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)
          }</Picker>

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
    textAlign: 'center',
  },
  subTitleText: {
    margin: 24,
    fontSize: 25,
    textAlign: 'center'
  },
  pickerStyles:{
    width:'70%',
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
  width:'90%',
  marginTop: 5,
  marginBottom:5,
},
messageItem: {
  marginTop: 10,
  marginBottom: 10,
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
messageCategory: {
  paddingLeft: 10,
  paddingBottom: 3,
  padding:5,
  fontSize: 15,
  color:'black',
},
likeButton: {
  backgroundColor: "#cfcfcf",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
  marginLeft: 10,
  width: '15%',
},
buttons: {
  backgroundColor: "rgb(8,58,129)",
  marginBottom: 15,
  marginTop: 7,
  marginLeft: 10,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
  width: '30%',
},
countStyle: {
fontSize: 16
},
buttonText: {
   color: 'white',
   textAlign:'center',
},
});