import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import tw from 'twrnc';

export default function Index() {

  return (
    <View style={tw`flex-1`}>

    <SafeAreaView style={styles.container}> 

      <View style={tw `flex-1 justify-center items-center`}>
        <Text style={tw `text-black text-3xl font-bold`}>
          Build calendar page here.
        </Text>  
      </View>

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