import React from "react";
import { useEffect, useState } from "react";
import { auth, db, db2 } from '../../../../firebase';
import { updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot, query, collection, where, addDoc, getDocs, doc } from "firebase/firestore";
import { ref, set, get, onValue, snapshot, child } from "firebase/database";
import { View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo"; 
import tw from 'twrnc';
import Favourites from "../../search/components/favourites";
import Food from "../../search/components/food"
import Icon from "react-native-vector-icons/AntDesign"; 
import { useNavigation } from '@react-navigation/native';
import ButtonTemplate from "../../../components/buttonTemplate";
import TextInputTemplate from "../../../components/textInputTemplate";
import PopUp from "../../search/components/popup";
import Followers from "../../followers/components/allFollowers";
import Reviews from "./allReviews";

const FavFood = () => {

    const [favId, setFavId] = useState([]); //stores id of 'liked' foods
    const [favFood, setFavFood] = useState([]); //stores details of 'liked' foods
    const [food, setFood] = useState([]); //stores details of ALL food in firestore database
    const [followers, setFollowers] = useState([]); //stores details of ALL followers of the user
    const [review, setReview] = useState(""); //stores text input into Review popup
    const [selected, setSelected] = useState(""); //stores food item that has been chosen to be reviewed
    const [selectedFoodId, setSelectedFoodId] = useState(""); //stores id of food item that has been chosen to be reviewed
    const [isPostOpen, setIsPostOpen] = useState(false); //determines if review pop-up is opened or closed
    const [reviewed, setReviewed] = useState([]); //stores ids of food items that have been previously reviewed (from realtime database)

    const navigation = useNavigation();

    //this function is called ONCE when the page mounts due to the empty useEFfect dependency below
    //purpose: get all food documents from database and store it in food useState
    const getFoodData = async () => {
        const FoodList = await Food();
        setFood(FoodList);
    };

    //this function is called ONCE when the page mounts due to the empty useEffect dependency below
    //purpose: get the id of food items liked by the user (in the faovurites field in users' document in firestore) and store it in favId useState
    const fetchFavId = async () => {
        const FavList = await Favourites(); 
        setFavId(FavList);
    }; 

    //this function is called ONCE when the page mounts & also whenever favId useState updates
    //purpose: get the details of the 'liked' food items and store it in favFood useState
    const getFavFoodData = async () => {
        const FavFood = food.filter((x) => favId.includes(x.id))
        setFavFood(FavFood);
    };

    //this function is called ONCE when the page mounts due to the empty useEffect dependency below
    //purpose: this function fetches the data of users' followers from the followers sub-collection in the users' document and stores followers data in followers useState
    const fetchFollowerUsers = async () => {
        const FollowersList = await Followers();
        setFollowers(FollowersList);
    }; 

    //useEffect runs on mount and calls the four functions above
    useEffect(() => {
        getFoodData();
        fetchFavId();
        fetchReviews();
        fetchFollowerUsers();
        //console.log("fetching:" , followers)
    }, []);

    //updates favFood useState whenever favId useState changes
    useEffect(() => {
        getFavFoodData();
    }, [favId]);

    //print statements to test updating of useStates used
    useEffect(() => {
        console.log("favid updating", favId)
    }, [favId]);

    useEffect(() => {
        console.log("favFood updating", favFood)
    }, [favFood]);

    useEffect(() => {
        console.log("favFood updating", food)
    }, [food]);

    //useEffect(() => {
    //    console.log("printing review: ", review);
    //}, [review]);

    //useEffect(() => {
    //    console.log("selected to post: ", selected);
    //}, [selected]);

    //useEffect(() => {
    //    console.log("selected id to post: ", selectedFoodId);
    //}, [selectedFoodId]);


    //purpose: this function handles the pressing of the filled heart button next to each food item
    //corresponding food item's id is removed from favourites field in users' document in firestore
    const handleUnlike = async(id) => {
        const user = auth.currentUser;
        const userRef = doc(db, "Users", user.uid);

        const newFav = favId.filter((food) => food != id);
        setFavId(newFav);
        await updateDoc(userRef, {
            favourites: arrayRemove(id)
        });
    }

    //purpose: this function handles what happens when the 'post' button next to each food item is clicked
    // (1) reset the review useState to an empty string
    // (2) store respective food item in selected useState
    // (3) store respective food item's id in selectedFoodId useState
    // (4) isPostOpen useState is set to true > opens review popup
    const clickPost = (likedFoodName, likedId) => {
        setReview("");
        setSelected(likedFoodName);
        setSelectedFoodId(likedId);
        setIsPostOpen(true);
    }

    const currentUserUID = auth.currentUser.uid; //this variable stores current users' uid (from firebase authentication)

    //purpose: this function handles what happens when the 'post' button on the review pop-up is clicked
    // (1) adds chosen food items uid to reviewed useState
    // (2) adds review under current user > reviews (in realtime database)
    // (3) calls addToFeed on each follower
    // (4) updates isPostOpen useState to false > closes review popup
    const handlePost = async () => {
        const editedReviewed = reviewed.concat(selectedFoodId);
        setReviewed(editedReviewed)

        set(ref(db2, 'users/' + currentUserUID + '/' + 'reviews/' + selectedFoodId), {
            foodId: selectedFoodId,
            review: review,
            date: new Date().getDate(),
        });
        //store post under all followers > feed 
        followers.forEach(user => addToFeed(user));

        setIsPostOpen(false);
    }

    //purpose: this function adds the review just typed into each followers feed branch in realtime database
    // (1) takes in follower as the argument
    // (2) adds new entry into followers feed branch and stores: PostedBysID (current users id), PostedBysUsername, foodId, foodName, review, date, month, year and time of review
    // (3) the entrys id = number of already existing entries (this allows entries to be stored in a numerically increasing manner)
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

    //purpose: fetch id of food items that have already been reviewed before (from realtime db) and these ids are stored in reviewed useState, these food items cannot be reviewed again
    const fetchReviews = async () => {
        const dbRef = ref(db2);
        get(child(dbRef, `users/${currentUserUID}/reviews`)).then((snapshot) => {
        if (snapshot.exists()) {
            const details = snapshot.val();
            const reviewedFoodId = Object.keys(details).map((value) => value)
            setReviewed(reviewedFoodId)
            console.log("realtime:", reviewedFoodId);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
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