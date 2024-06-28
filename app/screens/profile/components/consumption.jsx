import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableWithoutFeedback, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Button } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from 'expo-router';
import tw from 'twrnc';
import UserConsumption from "./userConsumption";
import PopUp from "../components/popup";
import TextInputTemplate from '../../../components/textInputTemplate';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../../../../firebase';
import { collection, doc, setDoc, getDoc, addDoc, getDocs, where, query } from "firebase/firestore"; 

const ConsumptionLog = () => {

    const navigation = useNavigation()

    const [searchText, setSearchText] = useState("");
    const [isAddFoodPageOpen, setIsAddFoodPageOpen] = useState(false);
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [meal, setMeal] = useState('')
    const [newFood, setNewFood] = useState(false);
    
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        console.log(searchText);
    }

    const handleCreation = async () => {
        try {
            const docRef = await addDoc(collection(db, 'Consumption'), {
                Name: name,
                Date: date,
                Meal: meal,
                uid: auth.currentUser.uid
            });
            const docSnap = await getDoc(docRef);
            console.log('Document written with ID: ', docSnap.data());
            setNewFood(true)
            setIsAddFoodPageOpen(false);
            setName("")
            setDate("")
            setMeal("")

        } catch (error) {
            console.error('Error creating new habit: ', error);
        }
    }

    useEffect(() => {
        setNewFood(false);
    }, [newFood])

    return (
        <View style={tw`items-center bg-green-800 w-7/8 rounded-lg`}>
            <Text style={tw `items-center text-white font-bold text-2xl pt-3 pb-1`}>
                Your food log!
            </Text>
            <View style={tw`flex justify-between flex-row px-4 py-1 bg-whitesmoke`}>
                <TextInput
                    onChangeText={handleSearchTextChange}
                    style={tw`w-full p-3 bg-white rounded-xl mb-3`}
                    placeholder="Search consumption history "
                    clearButtonMode="always"
                    autoCapitalize="none"
                    value={searchText}
                />
            </View>
            <UserConsumption newFood={newFood} />
            <ButtonTemplate 
                type = 'add'
                text = '+ ADD TO FOOD LOG'
                onPress = {() => setIsAddFoodPageOpen(true)}
            />

            <PopUp id='AddFoodPage' isOpen={isAddFoodPageOpen}>

            <View style={tw ``}> 
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
                                    onPress = {() => setIsAddFoodPageOpen(false)}
                                />
                            </View>

                            </View>

                        </SafeAreaView>

                        </ScrollView>

                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView> 

            </View>
            </PopUp>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1 ,
      backgroundColor: '#fff',
    },
});

export default ConsumptionLog;