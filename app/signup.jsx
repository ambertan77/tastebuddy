import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';

import tw from 'twrnc';
export default function Signup() {

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}> 
      <Text style={tw `text-white text-3xl font-bold`}>
        Create a new account!
      </Text>
      <Spacer size={20} />
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 400, height: 300}}
      />  
      <Spacer size={40} />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3`}
        placeholder="Enter your email address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3`}
        placeholder="Enter your username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3`}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => navigation.navigate('home')} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-2xl text-center font-bold`}>
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
    backgroundColor: '#e4a781',
    alignItems: 'center',
    justifyContent: 'center',
  },
});