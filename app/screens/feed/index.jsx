import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import NavigationTab from "../../components/navigationBar";

import tw from 'twrnc';
export default function Index() {
  

  return (
    <SafeAreaView style={styles.container}> 
      
      <View style={tw `flex-1 justify-center items-center`}>
        <Text style={tw `text-black text-3xl font-bold`}>
          Build feed page here.
        </Text>  
      </View>

      <NavigationTab/>

    </SafeAreaView>
  );
};

const Spacer = ({ size }) => <View style={{ height: size, width: size }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#fff',
  },
});