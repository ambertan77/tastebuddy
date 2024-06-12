import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import tw, { create } from 'twrnc';
import { collection, doc, setDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 
import ButtonTemplate from '../../components/buttonTemplate';


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
      <Text style={tw `text-black text-xl font-bold`}>
        Create a new account!
      </Text>
      <Spacer size={20} />
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: 250, height: 250}}
      />  
      <Spacer size={10} />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your email address"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your username"
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
        placeholder="Enter your password"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      
      <View style={tw`flex-row`}>
        <ButtonTemplate
        type = 'green' 
        size = 'big' 
        text = 'Sign Up' 
        onPress = {handleSignUp}
        />
      </View>

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-black text-center`}>
            Have an existing account?
        </Text>
        <WordSpace size={4} />
        <TouchableOpacity onPress={() => navigation.navigate('screens/login/index')}>
          <Text style={tw`text-green-900 text-center`}>
            Log in!
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const WordSpace = ({ size }) => <View style={{ height: 0, width: size }} />;
const Spacer = ({ size }) => <View style={{ height: size, width: size }} />;

const checkUsernameAvailability = async (username) => {
  const q = query(collection(db, "Users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});