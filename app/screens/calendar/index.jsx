import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';
import CalendarComponent from './components/calendar';
import AgendaComponent from './components/agenda';
import Header from './components/header';
import AddHabit from './components/addHabits';

export default function Index() {

  return (
    <View style={tw`flex-1`}>

      <Header />

      <AddHabit />

      <SafeAreaView style={styles.container}> 
   
        <AgendaComponent />
      
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