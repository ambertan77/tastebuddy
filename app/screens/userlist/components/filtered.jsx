import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import tw from 'twrnc';
import ButtonTemplate from "@/app/components/buttonTemplate";
import { useNavigation } from 'expo-router';
import { auth, db } from '../../../../firebase';
import { query, collection, where, addDoc, getDocs, doc } from 'firebase/firestore';


const Filter = ({data, input, setSearchText}) => {

    const currentUserUID = auth.currentUser.uid;
    const navigation = useNavigation();
    
    const [following, setFollowing] = useState(false);

    const follow = async (item) => {
        try {
            const currUserCollection = collection(db, 'Users', currentUserUID, 'Following');
            const docRef = await addDoc(currUserCollection, {
                username: item.username,
                email: item.email,
                uid: String(item.uid)
            });
            const otherUserCollection = collection(db, 'Users', currentUserUID, 'Followers');
            const otherDocRef = await addDoc(otherUserCollection, {
                username: item.username,
                email: item.email,
                uid: String(item.uid)
            });
            navigation.navigate('screens/profile/index');
            console.log('User has been followed: ', docRef.id)
        } catch (error) {
            console.error('Error following user: ', error)
        }
    }

    return (
        <View>
            <FlatList data={data} renderItem={({item}) => {
                if (input === "") {
                    return (
                        <View style={tw`h-14 m-1 flex-row justify-between rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                            </Text>
                            <View style={tw`pt-1 top-0 items-end pl-2 pr-1.5`}>
                                <ButtonTemplate
                                    type = 'add' 
                                    size = 'med' 
                                    text = '+ FOLLOW' 
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
                                        type = 'add' 
                                        size = 'med' 
                                        text = '+ FOLLOW' 
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