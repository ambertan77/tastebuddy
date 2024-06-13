import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'twrnc';
import { collection, doc, setDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 
import ButtonTemplate from '../../components/buttonTemplate';
import NewAccText from './components/newAccText';
import TextInputTemplate from '../../components/textInputTemplate';
import TBLogo from '../../components/logo';
import LoginText from '../signup/components/loginButton'

export default function Index() {

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigation = useNavigation()

  const handleSignUp = async () => {

    const usernameExists = await checkUsernameAvailability(username);
  
    if (usernameExists) {
      alert('Username has already been taken. Please use a different username.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      const uid = user.uid;
      console.log('Registered with: ', user.email);
      navigation.navigate('screens/home/index');
      
      setDoc(doc(db, "Users", uid), {
        username: username,
        email: email,
        password: password
      }).then(() => {
        console.log('data saved');
      }).catch((error) => {
        console.log(error);
      });;
    })
    .catch(error => alert('Failed to create new account. ' + error.message))
  }

  return (

    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={tw`flex-1 flex-grow`}
    >
    
      <ScrollView contentContainerStyle={tw`flex-1 flex-grow`}>

        <SafeAreaView style={styles.container}> 
      
          <View style={tw`items-center`}>
            <NewAccText/>
            <TBLogo/>

            <TextInputTemplate 
              style={tw`items-center`}
              type='2'
              text= 'Enter your email'
              setText = {text => setEmail(text)}
              value={email}
            />

            <TextInputTemplate 
              type='2'
              text= 'Enter your username'
              setText = {text => setUsername(text)}
              value={username}
            />

            <TextInputTemplate 
              type='1'
              text= 'Enter your password'
              setText = {text => setPassword(text)}
              value={password}
            />
      
            <ButtonTemplate
              type = 'green' 
              size = 'big' 
              text = 'Sign Up' 
              onPress = {handleSignUp}
            />

            <LoginText/>
          </View>

        </SafeAreaView>

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

const checkUsernameAvailability = async (username) => {
  const q = query(collection(db, "Users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2d8'
  },
});