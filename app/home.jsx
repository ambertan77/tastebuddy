import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image, View, TextInput } from 'react-native';
import { useNavigation } from 'expo-router';

import tw from 'twrnc';
export default function Home() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}> 
      <Text style={tw `text-black text-3xl font-bold`}>
        Build home page here.
      </Text>  
    </SafeAreaView>
  );
};

const Spacer = ({ size }) => <View style={{ height: size, width: size }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});