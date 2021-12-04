import React, {useState} from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Constants from 'expo-constants';
import NewPostButton from './newPostButton'

const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];

  export const Feed = () => {

  const [category,setCategory] = useState('Classes');
  return (
    <View style={styles.container}>
    
    {/* upper white section */}
      <View style = {styles.header}>
    {/*gave the following text its own unique style. 
        Can't get it to go to the right. 
        Need to make it generic to the current user, not just Wendy*/}
      <Text style={{fontSize: 15, alignItems: "right"}}> Welcome, Wendy! </Text>
      <Text style = {styles.titleText}> Feed </Text>
      </View>

      {/*The footer is the gray part, but its height doesn't extend for
      some reason? The amount of gray is static and I don't know how to fix it. */}
      <View style = {styles.footer}>
        <NewPostButton text="New Post" color= 'rgb(8,58,129)' />
        <Text style = {styles.subTitleText}> Recent Activity </Text>
        <Picker
          style={styles.pickerStyles}
          mode='dropdown'
          selectedValue={setCategory}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
       </Picker>
    </View>

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1, 
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
    }
});