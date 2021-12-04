import React, {useState} from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const NewPostButton = props => {
  const content = (
    <View style = {[styles.buttons, {backgroundColor: props.color}]}>
      <Text style = {styles.text}>New Post </Text>
    </View>
  )

  return <TouchableOpacity onPress = {props.onPress}>{content}</TouchableOpacity>
}
export default NewPostButton;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 15
  },
  buttons: {
    padding: 16,
    width: 100,
    borderRadius: 24,
    alignItems: 'center', 
    justifyContent: 'center'

  }
});