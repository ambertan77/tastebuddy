import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import Filter from "../../screens/search/components/filter";
import Header from "../../screens/search/components/header";
import Food from "../../screens/search/components/food";

export default function Index() {

  return (
    <View style={tw`flex-1 flex`}>

      <Header /> 
      
    <SafeAreaView style={styles.container}> 

      <ScrollView>
        <Food />
      </ScrollView>
      
    </SafeAreaView>

    <NavigationTab />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#f5f5f5',
  },
});