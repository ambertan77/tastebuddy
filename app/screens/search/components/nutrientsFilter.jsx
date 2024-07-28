import React from "react";
import {useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { auth, db, db2 } from '../../../../firebase.js';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, TextInput } from "react-native";
import ButtonTemplate from "../../../components/buttonTemplate";
import { fetchFood } from "./food";
import { fetchFavs } from "./favourites";
import Icon from "react-native-vector-icons/AntDesign"; 
import Entypo from "react-native-vector-icons/Entypo"; 
import PopUp from "./popup";
import { ref, set, get, onValue, snapshot, child, remove } from "firebase/database";
import tw from 'twrnc';

const Filter = ({input, setSearchText}) => {

    const [food, setFood] = useState([]); //stores ALL food data in firestore 
    const [selectedNutri, setSelectedNutri] = useState([]); //stores all nutrient filters chosen
    const [filteredFood, setFilteredFood] = useState([]); //stores food data after filtering according to chosen filters 
    const [fav, setFav] = useState([]); //stores list of ids that corresponds to users 'liked' foods
    const [random, setRandom] = useState([]); //stores randomly generated food item (with all details)
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false); //determines if random generator pop-up is opened or closed
    const [priceInput, setPriceInput] = useState(""); //stores price input keyed into the budget filter
    const [background, setBackground] = useState(""); //determines bg colour of price filter
    const [textColour, setTextColour] = useState("text-green-700"); //determines text colour of price filter

    let filters = ["Protein Source", "Carbohydrate Source", "Low in Sugar", "Low Fat"]; //an array of nutrition filters available
    
    //purpose: select price filter, determines what happens when price input is keyed into the budget filter
    // (1) price input stored in priceInput useState, (2) change bg colour and text colour of price input button filter
    // (3) (if) other nutri filters are selected > filter food by price and selected filters and assign it to filteredFood useState
    // (4) (else) no nutri filters are selected > filter food by price and assign it to filteredFood useState 
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

    //purpose: unselect price filter 
    const handlePriceButton = () => {
        setBackground("");
        setTextColour("text-green-700")
        filterItems();
    }

    //this function is called ONCE when the page mounts due to the empty useEFfect dependency below
    //purpose: get all food documents from database and store it in food useState
    const getFoodData = async () => { 
        const FoodList = await fetchFood();
        setFood(FoodList);
        setFilteredFood(FoodList); 
    }; 

    //this function is also called ONCE (after getFoodData is called) when the page mounts due to the empty useEFfect dependency below
    //purpose: get all fav food ids from database (user > favourites field) and store it in fav useState
    const getFavData = async () => {
        const FavList = await fetchFavs();
        setFav(FavList);
    }; 

    useEffect(() => {
        getFoodData();
        getFavData();
    }, [])

    //called when the nutritional filter buttons are clicked 
    //scenario 1: (if) filter is being unselected, filter is removed from selectedNutri useState
    //scenario 2: (else) filter is being selected, filter is added to selectedNutri useState
    const handleFilter = (cat) => {
        if (selectedNutri.includes(cat)) {
            let filters = selectedNutri.filter((i) => i !== cat);
            setSelectedNutri(filters);
        } else {
            setSelectedNutri([...selectedNutri, cat]);
        }
    };


    //purpose: (1) resets filteredFood useState to include ALL food items, (2) calls filterItems function
    //this useEffect is called every time selectedNutri changes (nutritional filters are selected/ unselected)
    useEffect(() => {
        setFilteredFood(food);
        filterItems();
      }, [selectedNutri]);

      
    //purpose: handles filteredFood useState, hence determines what is shown on feed page
    //scenario 1: (if) filters food data according to nutrients selected and stores it in filteredFood useState
    //scenatio 2: (else) resets filteredFood useState to include ALL food items
    const filterItems = () => {
        if (selectedNutri.length > 0) {
            let tempItems = food.filter((food) => selectedNutri.every((nutri) => food.Nutrients.includes(nutri)));
            setFilteredFood(tempItems.flat());
        } else {
          setFilteredFood(food);
        }
      };

    //purpose: handles backend of pressing 'like' button
    //(1) (if) unliking an item: food item is removed from favourites field in users document
    //(2) (else) liking an item: food item is added to favourites field in users document
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

    //print statements to test for infinite loops
    //useEffect(() => {
    //    console.log("Updated random state:", random);
    //    console.log("Updated food state:", food);
    //    console.log("Updated selectedNutri state:", selectedNutri);
    //    console.log("Updated filteredFood state:", filteredFood);
    //    console.log("Updated fav state:", fav);
    //    console.log("Updated generatorOpen state:", isGeneratorOpen);
    //}, [random, food, selectedNutri, filteredFood, fav, isGeneratorOpen]);

    //purpose: determines what happens when random box button is pressed
    // (1) pop up is opened, (2) random useState is reset to an empty array, (3) Math.random is used to choose a random food from filteredFood useState and this item is stored in random useState
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
                        testId={cat}
                    />
                    </View>
                ))}
                    <View style={tw`justify-center pl-2 pr-1.5`}>
                        <TouchableOpacity testID='priceButton' onPress={handlePriceButton} style={tw`w-fit px-3 mb-1 mt-1 border border-green-700 ${background} shadow-sm rounded-lg justify-center rounded-xl h-8`}>
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
                                    testID="priceFilter"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>

        <View style={tw`justify-center`}>
            <FlatList testID='randomFood' scrollEnabled={false} style={tw`flex grow-0`} data={random} renderItem={({item}) => {
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
        
        <View testID="foodList0">
        <FlatList testID="foodList" data={random[0] ? filteredFood.filter((food) => food.id != random[0].id) : filteredFood} renderItem={({item}) => {
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
                                    <TouchableOpacity testID="heart" onPress={() => handlePressLike(id=item.id)}>
                                        <Icon name={fav.includes(item.id) ? "heart" : "hearto"} size={20} color= "green" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                    )
                }

                if(item.Name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View testID="filterBySearch" style={tw`h-23 m-3 rounded-lg flex bg-white shadow flex-row`}> 
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
        </View>

    
    <View style={tw`absolute bottom-5 right-5 items-center justify-center`}>
        <TouchableOpacity 
            style={tw``}
            onPress={() => setIsGeneratorOpen(true)}
            testID='randomBox'
        >
            <Image
                source={require('../components/randgenicon.png')} 
                style={{width: 60, height: 60}}
             />
        </TouchableOpacity>

       <PopUp id='Generator' isOpen={isGeneratorOpen} testID="randomPopup">

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
                    testId='randomGO'
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