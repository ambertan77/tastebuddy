import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import { useNavigation } from '@react-navigation/native';
import Header from "./components/header";
import Users from "./components/users";
import tw from 'twrnc';

export default function Index() {

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 flex`}>

      <Header />
      
    <SafeAreaView style={styles.container}> 

        <Users />
      
    </SafeAreaView>

    <NavigationTab currentRoute='screens/profile'/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#f5f5f5',
  },
});