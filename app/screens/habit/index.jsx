import React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { StyleSheet, SafeAreaView} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import ButtonTemplate from '../../components/buttonTemplate';
import TextInputTemplate from '../../components/textInputTemplate';

export default function Index() {

  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState('')
  const [period, setPeriod] = useState('')
  const navigation = useNavigation()

  const handleCreation = () => {
    navigation.navigate('screens/calendar/index');
  }

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
                text= 'Enter the period your habit is active for'
                setText = {text => setPeriod(text)}
                value={period}
              />
        
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