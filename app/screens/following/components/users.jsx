import React from "react";
import {useEffect, useState } from "react";
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import Following from "../../following/components/allFollowing"

const Users = () => {

    const [following, setFollowing] = useState([]);

    const fetchFollowingUsers = async () => {
        const FollowingList = await Following();
        setFollowing(FollowingList);
    }; 

    useEffect(() => {
        fetchFollowingUsers();
      }, [following]);

    return (
        <View> 
            <FlatList data={following} renderItem={({item}) => {
                return (
                <View style={tw`h-11 m-2 rounded-lg flex bg-white shadow flex-row`}> 
                    <View style={tw`flex-4`}>
                        <Text style={tw`text-black px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                        </Text>
                    </View>
                </View>
                )
            }} />
            
        </View>
    )}

export default Users;