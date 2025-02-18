import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import tw from 'twrnc';
import { collection, doc, setDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 
import ButtonTemplate from '../../components/buttonTemplate';
import NewAccText from './components/newAccText';
import TextInputTemplate from '../../components/textInputTemplate';
import TBLogo from '../../components/logo';
import LoginText from '../signup/components/loginButton'

export default function Index() {

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [usernameList, setUsernameList] = useState([])
  const [hasError, setHasError] = useState('')
  
  const navigation = useNavigation();

  const fetchUsernames = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const usernameList = querySnapshot.docs.map(doc => doc.data()?.username);
    setUsernameList(usernameList);
    //console.log(usernameList);
  };

  useEffect(() => {
    fetchUsernames();
  }, [])


  const handleSignUp = () => {

    if (usernameList.includes(username)) {
      alert('Username already being used.');
      return;
    }

    // create new account with firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      const uid = user.uid;

      console.log('Signed up with: ', user.email);

      navigation.navigate('screens/home/index');
      
      // add new user document to firestore with the necessary fields and collections
      setDoc(doc(db, "Users", uid), {
        username: username,
        email: email,
        password: password,
        favourites: [], 
        uid: uid
      });

      addDoc(collection(db, "Users", uid, "Following"), {
        uid: null
      })

      addDoc(collection(db, "Users", uid, "Followers"), {
        uid: null
      })

      addDoc(collection(db, "Users", uid, "Habits"), {
        date: null
      })
    }).catch(error => alert('Failed to create new account. ' + error.message))
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
              <NewAccText/>
              <TBLogo/>

              <TextInputTemplate 
                style={tw`items-center`}
                type='2'
                text= 'Enter your email'
                setText = {text => setEmail(text)}
                value={email}
                testId='email'
              />

              <TextInputTemplate 
                type='2'
                text= 'Enter your username'
                setText = {text => setUsername(text)}
                value={username}
                testId='username'
              />

              <TextInputTemplate 
                type='1'
                text= 'Enter your password'
                setText = {text => setPassword(text)}
                value={password}
                testId='password'
              />
        
              <ButtonTemplate
                type = 'green' 
                size = 'big' 
                text = 'Sign Up' 
                onPress = {handleSignUp}
                testId='signupButton'
              />

              <LoginText/>
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