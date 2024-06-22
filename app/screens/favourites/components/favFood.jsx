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

    const [fav, setFav] = useState([]);
    const [favFood, setFavFood] = useState([]);

    const fetchFavId = async () => {
        const FavList = await Favourites();
        //console.log(FavList);
        setFav(FavList);
    }; 

    useEffect(() => {
        fetchFavId();
      }, [fav]);

    const getFavFoodData = async () => {
        const FoodList = await Food();
        const FavFood = FoodList.filter((x) => fav.includes(x.id))
        setFavFood(FavFood);
        //console.log(favFood);
    };

    useEffect(() => {
        getFavFoodData();
    }, [favFood])

    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    const handleUnlike = async(id) => {
        await updateDoc(userRef, {
            favourites: arrayRemove(id)
        }); 
        fetchFavId();
    }

    return (
        <View> 
            <FlatList data={favFood} renderItem={({item}) => {
                return (
                <View style={tw`h-20 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                    <View style={tw`flex-4`}>
                        <Text style={tw`text-black px-3 pt-2 font-bold text-xl`}>
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