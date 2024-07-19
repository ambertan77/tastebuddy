import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonTemplate from '../app/components/buttonTemplate';
import tw from 'twrnc';

export default function Index() {

  const navigation = useNavigation();

  const handlePressLogin = () => {
    if (navigation) {
      navigation.navigate('screens/login/index');
    }
  }

  const handlePressSignup = () => {
    if (navigation) {
      navigation.navigate('screens/signup/index');
    }
  }
  
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
        testId='signupButton'
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