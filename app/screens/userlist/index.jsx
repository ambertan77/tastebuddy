import React from 'react';
import {useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import Users from './components/users';
import Filter from "./components/filtered";

export default function Index() {

  const navigation = useNavigation()

  const [searchText, setSearchText] = useState("");
    
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

  return (
    <View style={tw`flex-1 flex`}>

      <View>
            <View style={tw`bg-green-700 h-40`}>
                <Text style={tw`text-white text-xl mt-15 text-center font-bold mb-2`}>
                    Search for a friend!
                </Text>

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