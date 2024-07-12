import React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView, Platform, Keyboard, Button } from 'react-native'
import { StyleSheet, SafeAreaView} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import ButtonTemplate from '../../components/buttonTemplate';
import TextInputTemplate from '../../components/textInputTemplate';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 

export default function Index() {

  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState('')
  const [period, setPeriod] = useState('')
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const navigation = useNavigation()
  const selectedDate = date.toDateString
  const currentUID = auth.currentUser.uid;

  const handleCreation = async () => {
    try {
      const docRef = await addDoc(collection(db, 'Users', currentUID, 'Habits'), {
        name: name,
        frequency: frequency,
        period: period, 
        date: date
      });
      navigation.navigate('screens/calendar/index')
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error creating new habit: ', error);
    }
  }

  const onChange = (event, selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1) < 10 ? "0" + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
    const day = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() : selectedDate.getDate()
    const formattedDate = year + "-" + month + "-" + day
    setShow(false);
    setDate(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (

    <KeyboardAvoidingView
      style={[tw`flex-1 flex-grow`, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <ScrollView>
      
          <SafeAreaView style={styles.container}>

            <View style={tw`items-center mt-55`}>
              <Text style={tw `font-bold text-3xl p-3`}>
                Create a new habit!
              </Text>

              <TextInputTemplate 
                style={tw`items-center`}
                type='2'
                text= 'Enter the name of your new habit'
                setText = {text => setName(text)}
                value={name}
              />

              <TextInputTemplate 
                type='2'
                text= 'Enter the frequency of your new habit'
                setText = {text => setFrequency(text)}
                value={frequency}
              />

              <TextInputTemplate 
                type='2'
                text= 'Enter the period of your new habit'
                setText = {text => setPeriod(text)}
                value={period}
              />

              <View style={tw `flex-1 justify-center items-center mb-2`}>
                <ButtonTemplate 
                  type = 'add'
                  size = 'med'
                  text = '+ ADD SCHEDULED DATE'
                  onPress = {showDatepicker}
                />
                <Text>Date selected: {date.toLocaleString()}</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                  />
                )}
              </View>
        
              <ButtonTemplate
                type = 'green' 
                size = 'big' 
                text = 'Create' 
                onPress = {handleCreation}
              />

            </View>

          </SafeAreaView>

        </ScrollView>

      </TouchableWithoutFeedback>

    </KeyboardAvoidingView> 
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#fff',
  },
});