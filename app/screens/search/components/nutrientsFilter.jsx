import React from "react";
import {useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import Food from "./food";
import tw from 'twrnc';
import ButtonTemplate from "../../../components/buttonTemplate";
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
                        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.Name}
                            </Text>
                            <Text style={tw`px-3 pt-1 text-amber-700`}>
                            ${item.Price}
                            </Text>
                        </View>
                    )
                }

                if(item.Name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.Name}
                            </Text>
                            <Text style={tw`px-3 pt-1 text-amber-700`}>
                            ${item.Price}
                            </Text>
                        </View>
                    )
                }
            }}/>
        </View>
    </View>
)}

export default Filter;