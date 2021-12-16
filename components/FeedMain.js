import React, {useState, useEffect, useContext} from 'react';
import { FlatList, Button, Image, Text, View, StyleSheet, Picker } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './newPostButton.js';
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import { MakePost } from './makePost.js';
import NavigationBar from './NavigationBar.js';
import StateContext from './StateContext.js';
import { loginStyle } from './loginStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
 'posts': 'I wish we could be done with finals now...',
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

const categories = ['All','Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];
 
function formatDateTime(date) {
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
}

const MessageItem = props => { 
  return (
  <View style={styles.postContainer}>
    <Text style={styles.messageDateTime}>{formatDateTime(props.message.date)}</Text>
    <Text style={styles.messageAuthor}>{props.message.fName} {props.message.lName}</Text>
    <Text style={styles.messageContent}>{props.message.posts}</Text>
    <Button style={styles.delButton} title = "Delete"/>
  </View> 
); 
}

export const Feed = ({navigation}) => {
  const loggedInProps = useContext(StateContext);

  // State for chat channels and messages
  const [category,setCategory] = React.useState(categories);
 // const [selectedCategory, setSelectedCategory] = React.useState('Classes');
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

  useEffect(() => {
    getMessagesForCategory(category);  
    return () => {
    }
  }, []);

useEffect(
  () => { 
    getMessagesForCategory(category); 
  },
  [category, localMessageDB]
); 


  async function getMessagesForCategory(cat) {
    if (cat !== 'All') {
      setSelectedMessages(localMessageDB.filter( msg => msg.category === cat));
    } else {
      setSelectedMessages(localMessageDB);
    }
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
    {/* remove arrow going back to login page -> change to "logout" button */}
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
        <TouchableOpacity style = {loginStyle.buttons}
                onPress={() => navigation.navigate('New Post')}
        ><Text style = {loginStyle.buttonText}>New Post</Text></TouchableOpacity>
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
    height: '45%',
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
  color:'gray',
},
messageAuthor: {
  paddingLeft: 5,
  color:'blue',
},
messageContent: {
  paddingLeft: 10,
  padding:5,
  color:'black',
},
delButton: {
  padding: 16,
    width: 100,
    borderRadius: 24,
    alignItems: 'center', 
    justifyContent: 'center'
}
});