import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import tw from 'twrnc';
import ButtonTemplate from "@/app/components/buttonTemplate";
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../../firebase';
import { query, collection, where, addDoc, getDocs, getDoc, doc } from 'firebase/firestore';
import Following from "../../following/components/allFollowing";

const Filter = ({data, input, setSearchText}) => {

    const currentUserUID = auth.currentUser.uid;
    const navigation = useNavigation();
    
    const [following, setFollowing] = useState([]);
    const [currentAppUser, setCurrentAppUser] = useState("");
    const [editedData, setEditedData] = useState([]);

    // get the current user's document in firebase
    const getCurrentUser = async () => {
        const docRef = doc(db, "Users", currentUserUID);
        const docSnap = await getDoc(docRef);
        setCurrentAppUser(docSnap.data());
    }

    // get the list of users the current user is following 
    const getFollowingList = async () => {
        const followingList = await Following();
        setFollowing(followingList.map((user) => user.uid));
    }

    // ensure that the users displayed does not include the current user
    const editData = () => {
        const data2 = data.filter((user) => user.uid != currentUserUID)
        setEditedData(data2);
    }

    useEffect(() => {
        getCurrentUser();
        getFollowingList();
        console.log("current user:" , currentAppUser)
        console.log("updated following list:" , following)
    }, [])

    useEffect(() => {
        editData();
    }, [data])

    useEffect(() => {
        console.log("current user:", currentAppUser)
    }, [currentAppUser])

    useEffect(() => {
        console.log("added to following:", following)
    }, [following])

    useEffect(() => {
        console.log("data edited2:", editedData)
    }, [editedData])

    
    // purpose: allows the user to follow another user
    const follow = async (item) => {
        if (following.includes(item.uid) == false) {
            try {
                const currUserDocRef = collection(db, 'Users', currentUserUID, 'Following');
                const docRef = await addDoc(currUserDocRef, {
                    username: item.username,
                    email: item.email,
                    uid: String(item.uid)
                });

                const friendsUID = item.id
                const friendDocRef = collection(db, 'Users', friendsUID, 'Followers');
                const docRef2 = await addDoc(friendDocRef, {
                    username: currentAppUser.username,
                    email: currentAppUser.email,
                    uid: currentUserUID
                });
                const newFollowing = following.concat(item.uid)
                setFollowing(newFollowing)
                console.log('User has been followed: ', docRef.id)
            } catch (error) {
                console.error('Error following user: ', error)
            }
        }
    }

    return (
        <View>
            <FlatList data={editedData} renderItem={({item}) => {
                if (input === "") {
                    return (
                        <View style={tw`h-14 m-1 flex-row justify-between rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                            </Text>
                            <View style={tw`pt-1 top-0 items-end pl-2 pr-1.5`}>
                                <ButtonTemplate
                                    type = {following.includes(item.uid) ? 'added' : 'add'}
                                    size = 'med' 
                                    text = {following.includes(item.uid) ? 'following' : '+ follow'}
                                    onPress = {() => follow(item)}
                                />
                            </View>
                        </View>
                    )
                }

                if(item.username.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={tw`h-14 m-1 flex-row justify-between rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                            </Text>
                            <View style={tw`pt-1 top-0 items-end pl-2 pr-1.5`}>
                                <ButtonTemplate
                                        type = {following.includes(item.uid) ? 'added' : 'add'} 
                                        size = 'med' 
                                        text = {following.includes(item.uid) ? 'following' : '+ follow'}
                                        onPress = {() => follow(item)}
                                />
                            </View>
                        </View>
                    )
                }
            }}/>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: '#f5f5f5',
    },
});