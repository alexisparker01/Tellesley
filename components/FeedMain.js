import React, {useState, Component} from 'react';
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
import { MakePost } from './makePost';
import NavigationBar from './NavigationBar';

function emailOf(user) {
  if (user) {
    return user.email;
  } else {
    return null;
  }
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
   
const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];

export const Feed = ({navigation}) => {

  const [state, setState] = useState({
    mapIcon: 'https://cdn-icons-png.flaticon.com/512/149/149442.png', 
    feedIcon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
    profileIcon: 'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1638490784~hmac=b835b7356f4d2d578798e433831c4aa7',
  })

    const [category,setCategory] = useState('classes');

  return (
    <View style={styles.container}>
    
    {/* upper white section */}
      <View style = {styles.header}>
      <Text style={{fontSize: 15, alignItems: 'right'}}> Welcome, Wendy! </Text>
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
          selectedValue={setCategory}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
        </Picker>
        </View>
        <View style = {styles.postContainer}></View>
        <NavigationBar/>
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
    width:'60%',
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