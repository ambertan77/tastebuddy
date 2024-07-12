import React from "react";
import { useEffect, useState } from "react";
import { auth, db, db2 } from '../../../../firebase';
import { updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot, query, collection, where, addDoc, getDocs, doc } from "firebase/firestore";
import { ref, set, get, onValue, snapshot } from "firebase/database";
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
import Followers from "../../followers/components/allFollowers";
import Reviews from "./allReviews";

const FavFood = () => {

    const [favId, setFavId] = useState([]);
    const [favFood, setFavFood] = useState([]);
    const [food, setFood] = useState([]);
    const [review, setReview] = useState("");
    const [selected, setSelected] = useState("");
    const [selectedFoodId, setSelectedFoodId] = useState("");
    const [isPostOpen, setIsPostOpen] = useState(false);
    const navigation = useNavigation();
    const [reviewed, setReviewed] = useState([]);

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
        fetchReviews();
    }, []);

    useEffect(() => {
        getFavFoodData();
      }, [favId]);

    //useEffect(() => {
    //    console.log("favid updating", favId)
    //}, [favId]);

    //useEffect(() => {
    //    console.log("printing review: ", review);
    //}, [review]);

    //useEffect(() => {
    //    console.log("selected to post: ", selected);
    //}, [selected]);

    //useEffect(() => {
    //    console.log("selected id to post: ", selectedFoodId);
    //}, [selectedFoodId]);

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

    const clickPost = (likedFoodName, likedId) => {
        setReview("");
        setSelected(likedFoodName);
        setSelectedFoodId(likedId);
        setIsPostOpen(true);
    }

    const [followers, setFollowers] = useState([]);

    const fetchFollowerUsers = async () => {
        const FollowersList = await Followers();
        setFollowers(FollowersList);
    }; 

    useEffect(() => {
        fetchFollowerUsers();
        //console.log("fetching:" , followers)
    }, []);

    const currentUserUID = auth.currentUser.uid;

    const handlePost = async () => {
        //backend
        //store post under user > reviews 
        const editedReviewed = reviewed.concat(selectedFoodId);
        setReviewed(editedReviewed)

        const currUserDocRef = collection(db, 'Users', currentUserUID, 'Reviews');
        const docRef = await addDoc(currUserDocRef, {
            foodId: selectedFoodId,
            review: review,
            date: new Date().getDate()
        });

        set(ref(db2, 'users/' + currentUserUID + '/' + 'reviews/' + selectedFoodId), {
            foodId: selectedFoodId,
            review: review,
            date: new Date().getDate(),
        });
        //store post under all followers > feed 
        followers.forEach(user => addToFeed(user));

        setIsPostOpen(false);
    }

    const addToFeed = async (user) => {
        const querySnapshot = await getDoc(doc(db, "Users", currentUserUID));
        const username = querySnapshot.data()?.username

        const followerUID = user.uid
        const friendDocRef = ref(db2, 'users/' + followerUID + '/' + 'feed/')
        get(friendDocRef).then((snapshot) => {
            if (snapshot.exists()) {
                let index = snapshot.val().length
                //setValue(index);
                set(ref(db2, 'users/' + followerUID + '/' + 'feed/' + index), {
                    PostedBysID: currentUserUID,
                    PostedBysUsername: username,
                    foodId: selectedFoodId,
                    foodName: selected,
                    review: review,
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear(),
                    time: new Date().toLocaleTimeString()
                });
            } else {
                //setValue(0);
                let index = 0;
                set(ref(db2, 'users/' + followerUID + '/' + 'feed/' + index), {
                    PostedBysID: currentUserUID,
                    PostedBysUsername: username,
                    foodId: selectedFoodId,
                    foodName: selected,
                    review: review,
                    date: new Date().getDate(),
                    month: new Date().getMonth(),
                    year: new Date().getFullYear(),
                    time: new Date().toLocaleTimeString()
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const fetchReviews = async () => {
        const reviewList = await Reviews();
        const edited = reviewList.map((review) => review.foodId)
        //console.log("reviewlist:", reviewList)
        setReviewed(edited);
    };

    //useEffect(() => {
    //    console.log("reviewed data:", reviewed)
    //}, [reviewed]);


    return (
        <View> 
            <FlatList data={favFood} renderItem={({item}) => {
                return (
                <View key={item.id} style={tw`h-23 m-3 rounded-lg flex bg-white shadow flex-row`}> 
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
                                type = {reviewed.includes(item.id) ? "post-clicked" : "post"}
                                size = 'sm2' 
                                text = {reviewed.includes(item.id) ? "posted" : "post"}
                                onPress = {reviewed.includes(item.id) ? () => navigation.navigate("screens/favourites/index") : () => clickPost(item.Name, item.id)}
                            />

                            <PopUp id='Post' isOpen={isPostOpen}>

                                <SafeAreaView style={tw `rounded rounded-xl h-55 w-95 bg-white`}> 
                                    <View style={tw`flex flex-row`}> 
                                        <View style={tw`flex-9`}>
                                            <Text style={tw`px-5 pt-3 font-bold text-2xl`}>
                                                Review 
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
                                            Write your review about {selected} here.
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
                                            onPress = {() => handlePost()}
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