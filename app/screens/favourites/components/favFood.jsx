import React from "react";
import { useEffect, useState } from "react";
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo"; 
import tw from 'twrnc';
import Favourites from "../../search/components/favourites";
import Food from "../../search/components/food"
import Icon from "react-native-vector-icons/AntDesign"; 
import { useNavigation } from 'expo-router';
import ButtonTemplate from "../../../components/buttonTemplate";
import TextInputTemplate from "../../../components/textInputTemplate";
import PopUp from "../../search/components/popup";

const FavFood = () => {

    const [favId, setFavId] = useState([]);
    const [favFood, setFavFood] = useState([]);
    const [food, setFood] = useState([]);
    const [review, setReview] = useState("");
    const [isPostOpen, setIsPostOpen] = useState(false);
    const navigation = useNavigation();

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
                    <View style={tw`flex-4`}>
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

                        <View style={tw`mt-2`}>
                            <ButtonTemplate
                                type = 'post'
                                size = 'sm2' 
                                text = "post" 
                                onPress = {() => setIsPostOpen(true)}
                            />

                            <PopUp id='Post' isOpen={isPostOpen}>

                                <SafeAreaView style={tw `rounded rounded-xl h-55 w-95 bg-white`}> 
                                    <View style={tw`flex flex-row`}> 
                                        <View style={tw`flex-9`}>
                                            <Text style={tw`px-5 pt-3 font-bold text-2xl`}>
                                                Post 
                                            </Text>   
                                        </View>

                                        <View style={tw`flex-1 items-end`}>
                                            <TouchableOpacity onPress={() => setIsPostOpen(false)}>
                                                <Entypo name="cross" size={25} color= "gray" style={tw`absolute top-3 right-3`} />
                                            </TouchableOpacity>                
                                        </View>
                                    </View>

                                    <View style={tw`px-5 pt-2`}> 
                                        <Text style={tw`text-sm pb-2`}>
                                            Write your review about {item.Name} here.
                                        </Text> 

                                        <TextInputTemplate 
                                            style={tw`items-center`}
                                            type='3'
                                            text= 'Your review ...'
                                            setText = {(text => setReview(text))}
                                            value={review}
                                        />
                                    </View>

                                    

                                    <View style={tw`items-end mt-0 pr-5`}>
                                        <ButtonTemplate
                                            type = "post"
                                            size = 'sm2' 
                                            text = "post"
                                            onPress = {() => setIsPostOpen(false)}
                                        />
                                    </View>

                                </SafeAreaView>

                            </PopUp>

                        </View>
                    </View>
                </View>
                )
            }} />
            
        </View>
    )}

export default FavFood;