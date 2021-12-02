import React, {Component} from 'react';
import { SafeAreaView, ScrollView, View} from 'react-native';
import { Appbar, Button, TextInput, Card} from 'react-native-paper';
import { loginStyle } from './loginStyle';

export const SignUpScreen = () => {

        return (
            <SafeAreaView>
                <ScrollView>
                    <Appbar>
                        <Appbar.BackAction />
                        <Appbar.Content title = "Sign Up" />
                        
                    </Appbar>
                    <View>
                        <TextInput label = "First Name"/>
                        <TextInput label = "Last Name" />
                        <TextInput label = "Password" 
                                    secureTextEntry = {true} 
                                    right = {<TextInput.Icon 
                                    name = "eye-off-outline"/>}/>

                        <TextInput label = "Confirm Password" 
                                    secureTextEntry = {true} 
                                    right = {<TextInput.Icon 
                                    name = "eye-off-outline"/>}/>

                        <Button mode = "contained" 
                                style = {loginStyle.buttons}> Sign Up </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
}
