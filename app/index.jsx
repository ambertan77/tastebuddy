import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import ButtonTemplate from '../app/components/buttonTemplate';

import tw from 'twrnc';
export default function Index() {

  const navigation = useNavigation()
  const handlePressLogin = () => {
    navigation.navigate("screens/login/index")
  }

  return (
    <SafeAreaView style={styles.container}> 
      
      <Image
        source={require('../app/assets/images/logo.png')} 
        style={{width: 250, height: 250}}
      />  

      <Spacer size={10} />
      <TouchableOpacity onPress={() => navigation.navigate('screens/login/index')} 
        style={tw`w-4/5 bg-green-700 p-3 rounded-lg`}>
          <Text style={tw`text-white text-2xl text-center font-bold`}>
            Log In
          </Text>
      </TouchableOpacity>

      <Spacer size={10} />

      <TouchableOpacity onPress={() => navigation.navigate('screens/signup/index')} 
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
    backgroundColor: '#f4f2d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});