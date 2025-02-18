import { useState, useEffect, React } from "react";
import { Image, View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import NavigationTab from "../../components/navigationBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';
import ButtonTemplate from "../../components/buttonTemplate";
import Filter from "./components/nutrientsFilter";

export default function Index() {

  const [searchText, setSearchText] = useState("");
    
  const handleSearchTextChange = (text) => {
        setSearchText(text);
        console.log(searchText);
  }

  return (
    <View style={tw`flex-1`}>

      <View>
            <View style={tw`bg-green-700 h-40`}>
                <Text style={tw`text-white text-xl mt-15 text-center font-bold mb-2`}>
                    search
                </Text>

                <View style={tw`flex justify-between flex-row px-4 py-1 bg-whitesmoke`}>
                    <TextInput
                        onChangeText={handleSearchTextChange}
                        style={tw`w-full p-3 bg-white rounded-xl mb-3`}
                        placeholder="I want to eat ... "
                        clearButtonMode="always"
                        autoCapitalize="none"
                        value={searchText}
                        testID="searchBar"
                    />
                </View>
            </View>
      </View>
      
    <SafeAreaView style={styles.container}> 

        <Filter input={searchText} setSearchText={setSearchText} testID={'filter'} />
        
    </SafeAreaView>

    <NavigationTab currentRoute='screens/search'/>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#f5f5f5',
    marginBottom: 0,
  },
});