import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import UserDetails from "../profile/components/UserDetails";
import Header from "../../screens/profile/components/header";
import LogoutButton from "../../screens/profile/components/logoutButton";
import AddFriends from "../../screens/profile/components/addFriends";
import tw from 'twrnc';

export default function Index() {

  return (
    <View style={tw`flex-1`}>

      <Header/>

      <SafeAreaView style={styles.container}> 
        <LogoutButton />
        <UserDetails />
        <AddFriends />
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