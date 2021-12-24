import React, { useState, useEffect, useContext, Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, View, Text, TouchableOpacity, TextInput, Button, Picker, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import NavigationBar from './NavigationBar';
import { collection, doc, setDoc,
   query, where, getDocs} from "firebase/firestore";
import StateContext from './StateContext.js';
 
export const ViewProfile = ({navigation}) => {{

   const [userMessages, setUserMessages] = React.useState([]);
   const [textInputValue, setTextInputValue] = useState('');
   const [selectedCategory, setSelectedCategory] = React.useState('All');
   const [selectedMessages, setSelectedMessages] = React.useState([]);
   const loggedInProps = useContext(StateContext);
   const [useFirestore, setUseFirestore] = useState(selectedMessages.map( addTimestamp));

   const[count, setCount] = useState(0);
   const likers = React.useState([]);
   const [isLiked, setIsLiked] = useState(false);

   const [state, setState] = useState ({
      bio: 'Wellesley College 2023',
      profilePicture: 'https://th.bing.com/th/id/OIP.vIq_QWTLmuEoct13lW83UwHaHa?pid=ImgDet&rs=1',
      currentUser: true,
   })

   function formatDateTime(date) {
      return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
    }

   function addTimestamp(message) {
      return {...message, timestamp:message.date.getTime()}
    } 

    const MessageItem = props => { 
      return (
      <View style={styles.postContainer}>
        <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
        <Text style={styles.messageCategory}>{props.message.category}</Text>
        <Text style={styles.messageAuthor}>{props.message.user}</Text>
        <Text style={styles.messageContent}>{props.message.post}</Text>
        <TouchableOpacity style={styles.buttons}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
        <View style = {{flexDirection:'row', marginRight: 10}}>
          <TouchableOpacity style={styles.likeButton}onPress = {like()}><Text>Like</Text></TouchableOpacity>
          <Text style = {styles.countStyle}> {count} </Text>
        </View>
      </View> 
    ); 
    }

    useEffect(
      () => { 
        getMessagesForUser(loggedInProps.loggedInUser.email);
        //console.log("your email is:" + loggedInProps.loggedInUser.email);
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

  async function getMessagesForUser(us) {
     //gets the user object with this email
      const q = query(collection(loggedInProps.db, 'messages'), where('user', '==', us));
      const querySnapshot = await getDocs(q);

      let userMsgs = []; 
      querySnapshot.forEach(doc => {
          userMsgs.push(docToMessage(doc));
      });
      setSelectedMessages( userMsgs );
      console.log("User messages: " + userMsgs);
    }

    
  function like(){
   if(!isLiked)
     //indexOf returns -1 if the element is not found in the array
     if(likers.indexOf(loggedInProps.loggedInUser.email) === -1){
       likers.push(loggedInProps.loggedInUser.email)
       setCount(count + 1);

     }else{
       //make it true to indicate the post is liked
       setIsLiked(!isLiked);
     }
   } 


      return (
    
      <View style = {styles.container}>
         <View style = {styles.header}> 
            <Text style = {styles.username}>{loggedInProps.FName}</Text>
            <Image 
                  style={styles.profilePicture}
                  source={{
                  uri: state.profilePicture,
                  }}
            />
            <Text style = {styles.text}>{loggedInProps.FName + " " + loggedInProps.LName} </Text>
            <Text style = {styles.text}>{loggedInProps.bio} </Text>
            <TouchableOpacity
               style = {styles.buttons}
               onPress = {
                  () =>  navigation.navigate('EditProfile')
            }>
            <Text style = {styles.buttonText}> Edit Profile </Text>
            </TouchableOpacity>
            <View style = {styles.footer}>
            <Text style = {styles.username}> Posts </Text>

            {(selectedMessages.length === 0) ? 
            <Text>No messages to display</Text> :
            <FlatList style={styles.messageList}
               data={selectedMessages} 
               renderItem={ datum => <MessageItem message={datum.item}></MessageItem>} 
               keyExtractor={item => item.timestamp} 
            />
            }

            </View> 
         </View>
         <NavigationBar navigation = {navigation} />
      </View>
   
      )
         }
      }
export default ViewProfile


const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      fontFamily: "Times New Roman",
   },
   messageList: {
      width:'90%',
      marginTop: 5,
      marginBottom:5,
    },
   header: {
      flex: 1,
      height: "100%",
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(233,233,233)',
    },
    footer: {
      flex: 4, 
      marginTop: 10,
      height: "100%",
      width: "90%",
      borderTopLeftRadius: 700, 
      borderTopRightRadius: 700, 
      paddingVertical: 50, 
      paddingHorizontal: 30,
      alignItems: 'center',
      backgroundColor: 'white'
    },
   buttons: {
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: "rgb(8,58,129)",
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      padding: 5,
      borderTopLeftRadius: 5, 
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      width: '30%'
   },
   username: {
     padding: 10,
     fontSize: 24,
     fontWeight: 'bold',
     color: '#343535',
   },
    profilePicture: {
     height: 100,
     width: 100,
     padding: 30,
     marginTop: 10,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   },

   text:{
      padding: 4,
      textAlign: 'center',
      fontSize: 18,
      color: '#343535'
   },
   
   buttonText: {
      color: "white",
      fontSize: 15
   },

 buttonFollow: {
      backgroundColor: '#1DA1F2',
      padding: 10,
      margin: 15,
      height: 40,
   }, 
    postContainer: {
      backgroundColor: '#eeeded',
      borderColor: 'rgb(222,222,222)',
      borderWidth: 2,
      fontSize: 18,
      paddingTop:10,
      paddingBottom:10,
      marginLeft: 10
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
      marginLeft: 10,
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
      width: '20%',
    },
})