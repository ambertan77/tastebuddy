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
import { collection, doc, setDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 

export default function AddFood() {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [meal, setMeal] = useState('')
    const navigation = useNavigation()

    const handleCreation = () => {
        try {
            const docRef = addDoc(collection(db, 'Consumption'), {
                Name: name,
                Date: date,
                Meal: meal,
                uid: auth.currentUser.uid
            });
            navigation.navigate('screens/profile/index')
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error creating new habit: ', error);
        }
    }

    const goBack = () => {
        navigation.navigate("screens/profile/index");
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
                    Enter new food item into food log.
                </Text>

                <TextInputTemplate 
                    style={tw`items-center`}
                    type='2'
                    text= 'Enter the name of your food item'
                    setText = {text => setName(text)}
                    value={name}
                />

                <TextInputTemplate 
                    type='2'
                    text= 'Enter the date of consumption'
                    setText = {text => setDate(text)}
                    value={date}
                />

                <TextInputTemplate 
                    type='2'
                    text= 'Enter the meal (e.g. Lunch)'
                    setText = {text => setMeal(text)}
                    value={meal}
                />
            
                <ButtonTemplate
                    type = 'green' 
                    size = 'big' 
                    text = 'Add' 
                    onPress = {handleCreation}
                />

                <View style={tw `flex-row items-center`}>
                    <Text>
                        Nothing to input?
                    </Text>
                    <ButtonTemplate
                        type = 'no-bg' 
                        size = 'sm' 
                        text = ' Head back to your profile.' 
                        onPress = {goBack}
                    />
                </View>

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