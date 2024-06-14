import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Image, View } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import UsernameText from "../home/components/username";
import ButtonTemplate from '../../components/buttonTemplate';
import tw from 'twrnc';

export default function Index() {

  return (
    <View style={tw`flex-1`}>

    <SafeAreaView style={styles.container}> 

      <View style={tw `flex-1 justify-center items-center`}>

        <Text style={tw `text-black text-xl font-bold`}>
          Welcome,
        </Text>  

        <UsernameText />
        
      </View>

    </SafeAreaView>
    
    <NavigationTab />
    
    </View>
  );
};

//const Spacer = ({ size }) => <View style={{ height: size, width: size }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#fff',
  },
});