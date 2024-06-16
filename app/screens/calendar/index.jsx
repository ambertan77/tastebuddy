import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import CalendarComponent from './components/calendar';
import Header from './components/header';

export default function Index() {

  return (
    <View style={tw`flex-1`}>

      <Header />
      
      <SafeAreaView style={styles.container}> 

        <CalendarComponent />  
      
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