import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

import tw, { create } from 'twrnc';
export default function Signup() {

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigation = useNavigation()

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with: ', user.email);
      navigation.navigate('home');
    })
    .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.container}> 
      <Text style={tw `text-black text-xl font-bold`}>
        Create a new account!
      </Text>
      <Spacer size={20} />
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 250, height: 250}}
      />  
      <Spacer size={10} />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your email address"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Spacer size={10} />
      <TouchableOpacity onPress={handleSignUp} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-xl text-center font-bold`}>
            Sign Up!
          </Text>
      </TouchableOpacity>
      <Spacer size={10} />
      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-black text-center`}>
            Have an existing account?
        </Text>
        <WordSpace size={4} />
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={tw`text-green-900 text-center`}>
            Log in!
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const WordSpace = ({ size }) => <View style={{ height: 0, width: size }} />;
const Spacer = ({ size }) => <View style={{ height: size, width: size }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});