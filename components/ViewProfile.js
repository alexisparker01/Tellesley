import React, { useState, useEffect, useContext, Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
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
        <Text style={styles.messageAuthor}>{props.user.FName} {props.user.LName}</Text>
        <Text style={styles.messagePost}>{props.message.post}</Text>
        <TouchableOpacity><Button style={styles.delButton}>Delete</Button></TouchableOpacity>
    
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
      const q = query(collection(loggedInProps.db, 'users'), where('email', '==', us));
      const querySnapshot = await getDocs(q);

      let userMsgs = []; 
      querySnapshot.forEach(doc => {
          userMsgs.push(docToMessage(doc));
      });
      setSelectedMessages( userMsgs );
      console.log("User messages: " + selectedMessages);
    }


      return (
    
      <ScrollView style = {styles.container}>
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
      </ScrollView>
   
      )
         }
      }
export default ViewProfile


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      fontFamily: "Times New Roman",
   },
   messageList: {
      width:'100%',
      marginTop: 5,
      marginBottom:5,
    },
   header: {
      flex: 1,
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(233,233,233)',
    },
    footer: {
      flex: 4, 
      marginTop: 10,
      height: "100%",
      width: "90%",
      borderTopLeftRadius: 1000, 
      borderTopRightRadius: 1000, 
      paddingVertical: 50, 
      paddingHorizontal: 30,
      alignItems: 'center',
      backgroundColor: 'white'
    },
   buttons: {
      backgroundColor: "rgb(8,58,129)",
      marginTop: 25,
      marginBottom: 15,
      padding: 5,
      borderTopLeftRadius: 5, 
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
   },
   username: {
     padding: 10,
     fontSize: 24,
     fontWeight: 'bold',
     color: '#343535',
   },
    profilePicture: {
     height: 120,
     width: 120,
     padding: 30,
     marginTop: 10,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   },

   postsBox: {
     borderColor: 'black',
     borderRadius: 5,
     width: 100,
     height: 100,
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
})
