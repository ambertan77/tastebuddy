import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';

import tw from 'twrnc';
export default function Index() {

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}> 
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 400, height: 300}}
      />  
      <Spacer size={10} />
      <TouchableOpacity onPress={() => navigation.navigate('login')} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-2xl text-center font-bold`}>
            Log In
          </Text>
      </TouchableOpacity>
      <Spacer size={10} />
      <TouchableOpacity onPress={() => navigation.navigate('signup')} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-2xl text-center font-bold`}>
            Sign Up
          </Text>
      </TouchableOpacity>
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