import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import NavigationTab from "@/components/navigation/navigationBar";

import tw from 'twrnc';
export default function Index() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}> 
      <View style={tw`justify-start items-end pr-4`}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Text style={tw`text-green-900 text-center font-bold text-lg`}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw `flex-1 justify-center items-center`}>
        <Text style={tw `text-black text-3xl font-bold`}>
          Build profile page here.
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