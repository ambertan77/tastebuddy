import React from "react";
import {useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { auth, db } from '../../../../firebase';
import tw from 'twrnc';
import ButtonTemplate from "../../../components/buttonTemplate";
import { set } from "firebase/database";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const UserConsumption = ({input, setSearchText}) => {

    const uid = auth.currentUser.uid;

    const database = getFirestore();

    const [food, setFood] = useState([]);
    

    const getConsumptionData = async () => {
        try {
            const q = query(collection(db, "Consumption"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            const FoodList = querySnapshot.docs.map(doc => doc.data());
            setFood(FoodList);
        } catch (e) {
            alert('Error fetching user data. ' + error.message)
        } 
    };

    useEffect(() => {
        getConsumptionData();
    }, [food])

    
    return (
        <ScrollView style={tw `w-7/8 bg-white rounded-lg h-5/8`}>
            { food.length > 0 ? (
                food.map(food => (
                    <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                        <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {food.Name}
                        </Text>
                        <Text style={tw`px-3 pt-1 text-amber-700`}>
                            {food.Date}, {food.Meal}
                        </Text>
                    </View> 
                ))
                ) : (
                    <View style={tw `top-36 justify-center items-center`}>
                        <Text style={tw`px-3 pt-1 text-black items-center font-bold text-lg`}>
                            No data to display.
                        </Text>
                    </View>
                )
            }
        </ScrollView>
)}

export default UserConsumption;