import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { auth } from '../firebase';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with: ', user.email);
      navigation.navigate('home');
    })
    .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.container}> 
      <Text style={tw `text-black text-xl font-bold`}>
        Welcome back!
      </Text>
      <Spacer size = {20} />
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 250, height: 250}}
      />  
      <Spacer size={10} />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Spacer size={10} />
      <TouchableOpacity onPress={handleLogin} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-2xl text-center font-bold`}>
            Log In
          </Text>
      </TouchableOpacity>
      <Spacer size={10} />
      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-black text-center`}>
            Don't have an account yet? 
        </Text>
        <WordSpace size={4} />
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={tw`text-green-900 text-center`}>
            Sign up!
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