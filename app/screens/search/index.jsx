import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import Filter from "../../screens/search/components/filter";
import Header from "../../screens/search/components/header";

export default function Index() {

  return (
    <View style={tw`flex-1`}>

      <Header /> 
      
    <SafeAreaView style={styles.container}> 

      <ScrollView>
        <Text>
          food items here
        </Text>


      </ScrollView>
      
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