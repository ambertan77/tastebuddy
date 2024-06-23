import React from "react";
import {useEffect, useState } from "react";
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import ButtonTemplate from "../../../components/buttonTemplate";
import Food from "../components/food";
import Favourites from "../components/favourites";
import Icon from "react-native-vector-icons/AntDesign"; 
import { set } from "firebase/database";

const Filter = ({input, setSearchText}) => {

    const fetchFavData = async () => {
        const FavList = await Favourites();
        setFav(FavList);
    }; 

    const [food, setFood] = useState([]);
    const [selectedNutri, setSelectedNutri] = useState([]);
    const [filteredFood, setFilteredFood] = useState(food);
    const [fav, setFav] = useState(fetchFavData);
    //console.log(fav);

    const getFoodData = async () => {
        const FoodList = await Food();
        setFood(FoodList);
    };

    useEffect(() => {
        getFoodData();
    }, [])

    
    let filters = ["Protein Source", "Carbohydrate Source", "Low in Sugar", "Low Fat"];

    const handleFilter = (cat) => {
        if (selectedNutri.includes(cat)) {
            let filters = selectedNutri.filter((i) => i !== cat);
            setSelectedNutri(filters);
        } else {
            setSelectedNutri([...selectedNutri, cat]);
        }
    };

    useEffect(() => {
        setFilteredFood(food);
        filterItems();
      }, [selectedNutri, food]);
      
    
    const filterItems = () => {
        if (selectedNutri.length > 0) {
            let tempItems = food.filter((food) => selectedNutri.every((nutri) => food.Nutrients.includes(nutri)));
          setFilteredFood(tempItems.flat());
        } else {
          setFilteredFood(food);
        }
      };

    
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);

    const handlePressLike = async (id) => {
        if (fav.includes(id) == true) {
            await updateDoc(userRef, {
                favourites: arrayRemove(id)
            }); 
        } else {
            await updateDoc(userRef, {
                favourites: arrayUnion(id)
            }); 
        }  
    }

    useEffect(() => {
        fetchFavData();
      }, [fav]);

    return (
    
    <View style={tw`flex-1`}>
        <ScrollView horizontal={true} style={tw`h-13 flex flex-row`}>
            {filters.map((cat, id) => (
                <View style={tw`justify-center pl-2 pr-1.5`}>
                <ButtonTemplate
                    type = {selectedNutri?.includes(cat) ? "filter-clicked" : "filter"} 
                    size = 'med' 
                    text = {`${cat}`} 
                    onPress = {() => handleFilter(cat)}
                />
                </View>
            ))}
        </ScrollView>

        
        <FlatList style={tw`flex grow-0`} data={filteredFood} renderItem={({item}) => {
                if (input === "") {
                    //console.log(fav);
                    return (
                            <View style={tw`h-20 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                                <View style={tw`flex-4`}>
                                    <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                                        {item.Name}
                                    </Text>
                                    <Text style={tw`px-3 pt-1 text-amber-700`}>
                                        ${item.Price}
                                    </Text>
                                </View>

                                <View style={tw`flex-1 pt-3 pr-5 items-end`}>
                                    
                                    <TouchableOpacity onPress={() => handlePressLike(id=item.id)}>
                                        <Icon name={fav.includes(item.id) ? "heart" : "hearto"} size={20} color= "green" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                    )
                }

                if(item.Name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={tw`h-20 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                                <View style={tw`flex-4`}>
                                    <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                                        {item.Name}
                                    </Text>
                                    <Text style={tw`px-3 pt-1 text-amber-700`}>
                                        ${item.Price}
                                    </Text>
                                </View>

                                <View style={tw`flex-1 pt-3 pr-5 items-end`}>
                                    <TouchableOpacity onPress={() => handlePressLike(id=item.id)}>
                                        <Icon name={fav.includes(item.id) ? "heart" : "hearto"} size={20} color="green" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                    )
                }
            }}/>
        </View>
)}

export default Filter;