import React from "react";
import {useEffect, useState } from "react";
import { auth, db, db2 } from '../../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import { ref, onValue, snapshot } from "firebase/database"
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import Food from '../../search/components/food';
import tw from 'twrnc';

const FeedList = () => {

    const [feedData, setFeedData] = useState([]);
    const currentUserUID = auth.currentUser.uid;

    useEffect(() => {
        const feedRef = ref(db2, 'users/' + currentUserUID + '/' + 'feed/');
        onValue(feedRef, (snapshot => {
            const feeddata = snapshot.val();
            if (feeddata) {
                const fetchData = Object.keys(feeddata).map(key => ({
                    id: key,
                    ...feeddata[key]
                }));
                const orderedData = fetchData.reverse(); //latest on top
                setFeedData(orderedData);
            } else {
                setFeedData([]);
            }
        }));
    }, []);

    useEffect(() => {
        console.log("feed: ", feedData);
    }, [feedData]);

    return (
        <View> 
            <FlatList data={feedData} renderItem={({item}) => {
                return (
                <View style={tw`m-2 rounded-lg flex bg-white shadow flex-row`}> 
                    <View style={tw`flex-4`}>
                        <Text style={tw`text-black pl-3 pt-2 font-bold text-sm`}>
                            @{item.PostedBysUsername}
                        </Text>
                        <Text style={tw`text-amber-600 pl-3 pb-2 text-sm`}>
                            {item.foodName}: 
                            <Text style={tw`text-black`}>
                                {""} {item.review}
                            </Text>
                        </Text>  
                    </View>
                </View>
                )
            }} />
            
        </View>
    )}

export default FeedList;