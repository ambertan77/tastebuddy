import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import Feed from "./components/FeedList";
import Header from "./components/header";
import tw from 'twrnc';

export default function Index() {
  
  return (

    <View style={tw`flex-1 flex`}>

      <Header />
      
      <SafeAreaView style={styles.container}> 
          <Feed />
      </SafeAreaView>

      <NavigationTab currentRoute='screens/feed'/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#f5f5f5',
  },
});