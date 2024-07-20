import { useState, useEffect, React } from "react";
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import { useNavigation } from 'expo-router';
import Header from "../favourites/components/header";
import FavFood from "../favourites/components/favFood";
import tw from 'twrnc';

export default function Index() {

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 flex`}>

      <Header />
      
    <SafeAreaView style={styles.container}> 

        <FavFood />
      
    </SafeAreaView>

    <NavigationTab currentRoute='screens/favourites'/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#f5f5f5',
  },
});