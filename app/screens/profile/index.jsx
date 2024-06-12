import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';
import NavigationTab from "../../components/navigationBar";
import ButtonTemplate from '../../components/buttonTemplate';

import tw from 'twrnc';
export default function Index() {
  const navigation = useNavigation()

  const handleLogOut = () => {
    navigation.navigate("index")
  }

  return (
    <SafeAreaView style={styles.container}> 

      <View style={tw`items-end pr-4`}>
        <ButtonTemplate
        type = 'orange' 
        size = 'sm' 
        text = 'Log out' 
        onPress = {handleLogOut}
        />
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