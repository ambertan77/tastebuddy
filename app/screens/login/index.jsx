import { useState } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, SafeAreaView, keyboardVerticalOffset, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { auth } from '../../../firebase';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from 'expo-router';
import ButtonTemplate from '../../components/buttonTemplate';
import TextInputTemplate from '../../components/textInputTemplate';
import TBLogo from '../../components/logo';
import WelcText from '../login/components/welcText';
import SignUpText from '../login/components/signupButton';

export default function Index() {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with: ', user.email);
      navigation.navigate('screens/home/index');
    })
    .catch(error => alert('Login failed. ' + error.message))
  }

  return (

    <KeyboardAvoidingView
      style={[tw`flex-1 flex-grow`, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <ScrollView>
      
          <SafeAreaView style={styles.container}>

            <View style={tw`items-center`}>
              <WelcText/>
              <TBLogo/> 

              <TextInputTemplate 
                style={tw`items-center`}
                type='2'
                text= 'Enter your email'
                setText = {text => setEmail(text)}
                value={email}
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
                text = 'Login' 
                onPress = {handleLogin}
              />

              <SignUpText/>
            </View>

          </SafeAreaView>

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2d8'
  },
});