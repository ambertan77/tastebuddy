import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import { useNavigation } from 'expo-router';
import ButtonTemplate from '../app/components/buttonTemplate';

import tw from 'twrnc';
import { YellowBox } from 'react-native-web';
export default function Index() {

  const navigation = useNavigation();

  const handlePressLogin = () => {
    navigation.navigate("screens/login/index")
  }

  const handlePressSignup = () => {
    navigation.navigate("screens/signup/index")
  }

  console.disableYellowBox = true
  
  return (
    
    <SafeAreaView style={styles.container}> 
      
      <View style={tw`items-center pt-40`}>
        <Image
          source={require('../app/assets/images/logo.png')} 
          style={{width: 250, height: 250}}
        />
      </View>  

      <View style={tw`items-center`}>
        <ButtonTemplate
        type = 'green' 
        size = 'big' 
        text = 'Login' 
        onPress = {handlePressLogin}
        testId = "loginButton"
        />
      </View>
      
      <View style={tw`items-center`}>
        <ButtonTemplate
        type = 'green' 
        size = 'big' 
        text = 'Sign up' 
        onPress = {handlePressSignup}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2d8'
  },
});