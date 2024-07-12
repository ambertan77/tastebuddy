import React from "react";
import {useEffect, useState } from "react";
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, TextInput } from "react-native";
import ButtonTemplate from "../../../components/buttonTemplate";
import Food from "./food";
import Favourites from "./favourites";
import Icon from "react-native-vector-icons/AntDesign"; 
import Entypo from "react-native-vector-icons/Entypo"; 
import PopUp from "./popup";
import { set } from "firebase/database";
import tw from 'twrnc';

const Filter = ({input, setSearchText}) => {

    const [food, setFood] = useState([]);
    const [selectedNutri, setSelectedNutri] = useState([]);
    const [filteredFood, setFilteredFood] = useState([]);
    const [fav, setFav] = useState([]);
    const [random, setRandom] = useState([]);
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [priceInput, setPriceInput] = useState("");
    const [background, setBackground] = useState("");
    const [textColour, setTextColour] = useState("text-green-700");


    
    const handlePriceInput = (text) => {
        setPriceInput(text);
        console.log(priceInput);
        setBackground("bg-green-700");
        setTextColour("text-white");
        if (selectedNutri.length > 0) {
            let tempItems = food.filter((food) => selectedNutri.every((nutri) => food.Nutrients.includes(nutri)));
            const filteredbyBudget = tempItems.flat().filter((food) => food.Price < text)
            setFilteredFood(filteredbyBudget);
        } else {
            const filteredbyBudget = food.filter((food) => food.Price < text)
            setFilteredFood(filteredbyBudget);
        }
    }

    const handlePriceButton = () => {
        setBackground("");
        setTextColour("text-green-700")
        filterItems();
    }

    let filters = ["Protein Source", "Carbohydrate Source", "Low in Sugar", "Low Fat"];
    

    const getFoodData = async () => {
        const FoodList = await Food();
        setFood(FoodList);
        setFilteredFood(FoodList); 
    };

    const getFavData = async () => {
        const FavList = await Favourites();
        setFav(FavList);
    }; 

    useEffect(() => {
        getFoodData();
        getFavData();
    }, [])


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
      }, [selectedNutri]);
      
    
    const filterItems = () => {
        if (selectedNutri.length > 0) {
            let tempItems = food.filter((food) => selectedNutri.every((nutri) => food.Nutrients.includes(nutri)));
            setFilteredFood(tempItems.flat());
        } else {
          setFilteredFood(food);
        }
      };

      
    const handlePressLike = async (id) => {

        const user = auth.currentUser;
        const userRef = doc(db, "Users", user.uid);

        if (fav.includes(id) == true) {
            const newFav = fav.filter((food) => food != id);
            setFav(newFav);
            await updateDoc(userRef, {
                favourites: arrayRemove(id)
            }); 
            
            
        } else {
            setFav([...fav, id]);
            await updateDoc(userRef, {
                favourites: arrayUnion(id)
            }); 
            
        }  
    }

    //useEffect(() => {
    //    console.log("Updated random state:", random);
    //    console.log("Updated food state:", food);
    //    console.log("Updated selectedNutri state:", selectedNutri);
    //    console.log("Updated filteredFood state:", filteredFood);
    //    console.log("Updated fav state:", fav);
    //    console.log("Updated generatorOpen state:", isGeneratorOpen);
    //}, [random, food, selectedNutri, filteredFood, fav, isGeneratorOpen]);

    useEffect(() => {
        console.log("Updated food state:", food);
    }, [food]);

    const handleRandom = () => {
        setIsGeneratorOpen(false);

        setRandom([]);
        console.log(random);
        
        const chosen = filteredFood[Math.floor(Math.random() * (filteredFood.length - 0)) + 0];
        setRandom([chosen]);
        console.log(random);
    }

    return (

    <View style={tw`flex-1`}>

        <View style={tw`flex`}>
            <ScrollView horizontal={true} style={tw`h-13 flex flex-row`}>
                {filters.map((cat) => (
                    <View key={cat} style={tw`justify-center pl-2 pr-1.5`}>
                    <ButtonTemplate
                        type = {selectedNutri?.includes(cat) ? "filter-clicked" : "filter"} 
                        size = 'med' 
                        text = {`${cat}`} 
                        onPress = {() => handleFilter(cat)}
                    />
                    </View>
                ))}
                    <View style={tw`justify-center pl-2 pr-1.5`}>
                        <TouchableOpacity onPress={handlePriceButton} style={tw`w-fit px-3 mb-1 mt-1 border border-green-700 ${background} shadow-sm rounded-lg justify-center rounded-xl h-8`}>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`${textColour} text-base font-bold text-center`}>
                                    Price &lt;
                                </Text>
                            
                                <TextInput
                                    type="number"
                                    onChangeText={handlePriceInput}
                                    style={tw`w-fit p-2 rounded-xl font-bold text-white`}
                                    placeholder="$"
                                    autoCapitalize="none"
                                    inputMode="numeric"
                                    value={background === "" ? "" : priceInput}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>

        <View style={tw`justify-center`}>
            <FlatList scrollEnabled={false} style={tw`flex grow-0`} data={random} renderItem={({item}) => {
                    //if (random != "") {
                        return (
                                <View key={item.id} style={styles.randompick}> 
                                    <View style={tw`flex-7`}>
                                        <Text style={tw`px-3 pt-2 font-bold text-base`}>
                                            {item.Name}
                                        </Text>
                                        <Text style={tw`px-3 pt-1 text-green-700`}>
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
                } />
        </View>
        
        <FlatList data={random[0] ? filteredFood.filter((food) => food.id != random[0].id) : filteredFood} renderItem={({item}) => {
                if (input === "") {
                    return (
                            <View key={item.id} style={tw`h-23 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                                <View style={tw`flex-7`}>
                                    <Text style={tw`px-3 pt-2 font-bold text-base`}>
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
                        <View style={tw`h-23 m-3 rounded-lg flex bg-white shadow flex-row`}> 
                                <View style={tw`flex-7`}>
                                    <Text style={tw`px-3 pt-2 font-bold text-base`}>
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

    
    <View style={tw`absolute bottom-5 right-5 items-center justify-center`}>
        <TouchableOpacity 
            style={tw``}
            onPress={() => setIsGeneratorOpen(true)}
        >
            <Image
                source={require('../components/randgenicon.png')} 
                style={{width: 60, height: 60}}
             />
        </TouchableOpacity>

       <PopUp id='Generator' isOpen={isGeneratorOpen}>

            <SafeAreaView style={tw `rounded rounded-xl h-55 w-95 bg-white`}> 
                <View style={tw`flex flex-row`}> 
                    <View style={tw`flex-4`}>
                    <Text style={tw`px-5 pt-3 font-bold text-2xl`}>
                        Random Generator
                    </Text> 
                    <Text style={tw`px-5 pt-1 text-sm`}>
                        Select your filters.
                    </Text>   
                    </View>

                    <View style={tw`flex-1 items-end`}>
                    <TouchableOpacity onPress={() => setIsGeneratorOpen(false)}>
                        <Entypo name="cross" size={25} color= "gray" style={tw`absolute top-3 right-3`} />
                    </TouchableOpacity>                
                    </View>
                </View>

                <View style={tw`mt-3`}>
                    <View style={tw`flex-row`}>
                    <View style={tw`justify-center items-center pl-5 pr-2`}>
                        <ButtonTemplate
                        type = {selectedNutri?.includes("Protein Source") ? "filter-clicked" : "filter"} 
                        size = 'med' 
                        text = "Protein Source"
                        onPress = {() => handleFilter("Protein Source")}
                        />
                    </View>
                    <View style={tw`justify-center items-center pr-5`}>
                        <ButtonTemplate
                        type = {selectedNutri?.includes("Carbohydrate Source") ? "filter-clicked" : "filter"} 
                        size = 'med' 
                        text = "Carbohydrate Source"
                        onPress = {() => handleFilter("Carbohydrate Source")}
                        />
                    </View>
                    </View>

                    <View style={tw`flex-row`}> 
                    <View style={tw`justify-center items-center pl-5 pr-2`}>
                        <ButtonTemplate
                        type = {selectedNutri?.includes("Low in Sugar") ? "filter-clicked" : "filter"} 
                        size = 'med' 
                        text = "Low in Sugar"
                        onPress = {() => handleFilter("Low in Sugar")}
                        />
                    </View>
                    <View style={tw`justify-center items-center pr-5 pr-2`}>
                        <ButtonTemplate
                        type = {selectedNutri?.includes("Low Fat") ? "filter-clicked" : "filter"} 
                        size = 'med' 
                        text = "Low Fat"
                        onPress = {() => handleFilter("Low Fat")}
                        />
                    </View>
                    <View style={tw`justify-center items-center pr-5`}>
                        <TouchableOpacity onPress={handlePriceButton} style={tw`w-fit px-3 mb-1 mt-1 border border-green-700 ${background} shadow-sm rounded-lg justify-center rounded-xl h-8`}>
                            <View style={tw`flex-row items-center`}>
                                <Text style={tw`${textColour} text-base font-bold text-center`}>
                                    Price &lt;
                                </Text>
                            
                                <TextInput
                                    type="number"
                                    onChangeText={handlePriceInput}
                                    
                                    style={tw`w-fit p-2 rounded-xl font-bold text-white`}
                                    placeholder="$"
                                    autoCapitalize="none"
                                    keyboardType="numeric"
                                    value={background === "" ? "" : priceInput}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>

                <View style={tw`items-end mt-1 pr-5`}>
                    <ButtonTemplate
                    type = "green"
                    size = 'med' 
                    text = "GO"
                    onPress = {() => handleRandom()}
                    />
                </View>

            </SafeAreaView>
        </PopUp>

    </View>
    </View>

)}

const styles = StyleSheet.create({
    randompick: {
        height: 92, 
        margin: 12, 
        borderRadius: 12, 
        flexDirection: 'row', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 3, 
        backgroundColor: '#f4f2d8'
    },
  });

export default Filter;