import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase';
import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const FoodList = () => {

    const [food, setFood] = useState([])

    const fetchFood = async () => {
        const querySnapshot = await getDocs(collection(db, "Food"));
        const foodList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFood(foodList);
    };

    useEffect(() => {
        fetchFood();
    }, [])
 

  return (
    <ScrollView>
      {food.map(food => (
        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
          <Text style={tw`px-3 pt-2 font-bold text-xl`}>
            {food.Name}
          </Text>
          <Text style={tw`px-3 pt-1 text-amber-700`}>
            ${food.Price}
          </Text>
        </View> 
          
      ))}
    </ScrollView>
  );
};

export default FoodList;
