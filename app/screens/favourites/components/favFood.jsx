import React from "react";
import {useEffect, useState } from "react";
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import Favourites from "../../search/components/favourites";
import Food from "../../search/components/food"
import Icon from "react-native-vector-icons/AntDesign"; 

const FavFood = () => {

    const [favId, setFavId] = useState([]);
    const [favFood, setFavFood] = useState([]);
    const [food, setFood] = useState([]);

    const getFoodData = async () => {
        const FoodList = await Food();
        setFood(FoodList);
    };

    const fetchFavId = async () => {
        const FavList = await Favourites();
        setFavId(FavList);
    }; 

    const getFavFoodData = async () => {
        const FavFood = food.filter((x) => favId.includes(x.id))
        setFavFood(FavFood);
    };

    useEffect(() => {
        getFoodData();
        fetchFavId();
      }, []);

    useEffect(() => {
        getFavFoodData();
      }, [favId]);

    //print statements for checking  
    //useEffect(() => {
    //    console.log("Updated food state:", food);
    //    console.log("Updated favId state:", favId);
    //    console.log("Updated favFood state:", favFood);
    //}, [food, favId, favFood]);

    const handleUnlike = async(id) => {
        const user = auth.currentUser;
        const userRef = doc(db, "Users", user.uid);

        const newFav = favId.filter((food) => food != id);
        setFavId(newFav);
        await updateDoc(userRef, {
            favourites: arrayRemove(id)
        });
    }

    return (
        <View> 
            <FlatList data={favFood} renderItem={({item}) => {
                return (
                <View style={tw`h-23 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                    <View style={tw`flex-7`}>
                        <Text style={tw`text-black px-3 pt-2 font-bold text-base`}>
                            {item.Name}
                        </Text>
                        <Text style={tw`px-3 pt-1 text-amber-700`}>
                            ${item.Price}
                            
                        </Text>
                    </View>

                    <View style={tw`flex-1 pt-3 pr-5 items-end`}>
                        
                        <TouchableOpacity onPress={() => handleUnlike(id=item.id)}>
                            <Icon name={favFood.includes(item) ? "heart" : "hearto"} size={20} color= "green" />
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }} />
            
        </View>
    )}

export default FavFood;