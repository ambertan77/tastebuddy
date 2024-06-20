import React from "react";
import {useEffect, useState } from "react";
import { useNavigation } from 'expo-router';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Food from "./food";
import tw from 'twrnc';
import ButtonTemplate from "../../../components/buttonTemplate";
import Icon from "react-native-vector-icons/FontAwesome5";
import { set } from "firebase/database";

const Filter = ({input, setSearchText}) => {

    const [food, setFood] = useState([]);
    const [selectedNutri, setSelectedNutri] = useState([]);
    const [filteredFood, setFilteredFood] = useState(food);

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

    const navigation = useNavigation()

    const handle = () => {
            navigation.navigate("screens/favourites/index")
    }

    return (
    
    <View>
        <ScrollView horizontal={true} style={tw`h-15 flex flex-row`}>
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

        <View>
            <FlatList data={filteredFood} renderItem={({item}) => {
                if (input === "") {
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
                                    <TouchableOpacity onPress={handle}>
                                        <Icon name="heart" size={20} color="green" />
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
                                    <TouchableOpacity onPress={handle}>
                                        <Icon name="heart" size={20} color="green" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                    )
                }
            }}/>
        </View>
    </View>
)}

export default Filter;