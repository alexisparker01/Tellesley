import React from 'react';
import { SafeAreaView, ScrollView, View} from 'react-native';
import { Appbar, Button, TextInput} from 'react-native-paper';
import { signUpStyle } from './signUpStyle';

export const SignUpScreen = () => {

        return (
            <SafeAreaView>
                <ScrollView>
                    <Appbar>
                        <Appbar.BackAction />
                        <Appbar.content title = "Sign Up" />
                    </Appbar>
                    <View>
                        <TextInput label = "First Name"/>
                        <TextInput label = "Last Name" />
                        <TextInput label = "Username" />
                        <TextInput label = "Password" secureTextEntry = {true} right = {<TextInput.Icon name = "eye-off-outline"/>}/>
                        <TextInput label = "Confirm Password" secureTextEntry = {true} right = {<TextInput.Icon name = "eye-off-outline"/>}/>
                        <TextInput label = "description" />
                        <Button mode = "contained" > Sign Up </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
}

