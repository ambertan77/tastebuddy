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

  const handlePressSignup = () => {
    navigation.navigate("screens/signup/index")
  }

  return (
    <SafeAreaView style={styles.container}> 
      
      <Image
        source={require('../app/assets/images/logo.png')} 
        style={{width: 250, height: 250}}
      />  

      <View style={tw`flex-row`}>
        <ButtonTemplate
        type = 'green' 
        size = 'big' 
        text = 'Login' 
        onPress = {handlePressLogin}
        />
      </View>
      
      <View style={tw`flex-row`}>
        <ButtonTemplate
        type = 'green' 
        size = 'big' 
        text = 'Sign up' 
        onPress = {handlePressSignup}
        />
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