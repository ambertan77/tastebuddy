import React from 'react';
import {useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Link, TouchableOpacity } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import Filter from "./components/filtered";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Index() {

  const navigation = useNavigation()      

  const [searchText, setSearchText] = useState("");
    
  // allows users to search through the list of all users
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    console.log(searchText);
  }
  
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  useEffect(() => {
      fetchUsers();
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const handleBackButton = () => {
    navigation.navigate("screens/profile/index");
  }

  return (
    <View style={tw`flex-1 flex`}>

      <View>
            <View style={tw`bg-green-700 h-40`}>
                <View style={tw `flex-row items-center px-1`}>
                  <TouchableOpacity style={tw `items-start ml-3 mt-13`} onPress={handleBackButton} testID='backButton'>
                    <Icon name="chevron-left" size="20" color="white" />
                  </TouchableOpacity>
                  <Text style={tw`text-white text-xl mt-15 text-center font-bold mb-2 ml-21`}>
                      Search for a friend!
                  </Text>
                </View>

                <View style={tw`flex justify-between flex-row px-4 py-1 bg-whitesmoke`}>
                    <TextInput
                        onChangeText={handleSearchTextChange}
                        style={tw`w-full p-3 bg-white rounded-xl mb-3`}
                        placeholder="Search for ... "
                        clearButtonMode="always"
                        autoCapitalize="none"
                        value={searchText}
                    />
                </View>
            </View>

      </View>
      
    <SafeAreaView style={styles.container}> 

        <Filter data={users} input={searchText} setSearchText={setSearchText} />
      
    </SafeAreaView>

    <NavigationTab />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#fff',
  },
});