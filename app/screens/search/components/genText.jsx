import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import Icon from "react-native-vector-icons/Entypo"; 
import ButtonTemplate from '@/app/components/buttonTemplate';
import { auth, db } from '../../../../firebase';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import tw from 'twrnc';

export default function Generator({closeModal, selectedFilters, filteredFood}) {

  const [selectedNutri, setSelectedNutri] = useState(selectedFilters);
  //console.log(filteredFood);

  const handleFilter = (string) => {
    if (selectedNutri.includes(string)) {
        let filters = selectedNutri.filter((i) => i !== string);
        setSelectedNutri(filters);
    } else {
        setSelectedNutri([...selectedNutri, string]);
    }
  };

  const user = auth.currentUser;
  const userRef = doc(db, "Users", user.uid);

  const handleRandom = async () => {
    closeModal();
    const chosen = filteredFood[Math.floor(Math.random() * (filteredFood.length - 0)) + 0];
    await updateDoc(userRef, {
      random: chosen.id
    }); 
  }
  
  return (
    <SafeAreaView style={tw `rounded rounded-xl h-55 w-95 bg-white`}> 

      <View style={tw`flex flex-row`}> 
        <View style={tw`flex-4`}>
          <Text style={tw`px-5 pt-3 font-bold text-2xl`}>
            Random Generator
          </Text> 
          <Text style={tw`px-5 pt-1 text-sm`}>
            Select your filters.
          </Text>   
        </View>

        <View style={tw`flex-1 items-end`}>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="cross" size={25} color= "gray" style={tw`absolute top-3 right-3`} />
          </TouchableOpacity>                
        </View>
      </View>

      <View style={tw`mt-3`}>
        <View style={tw`flex-row`}>
          <View style={tw`justify-center items-center pl-5 pr-2`}>
            <ButtonTemplate
              type = {selectedNutri?.includes("Protein Source") ? "filter-clicked" : "filter"} 
              size = 'med' 
              text = "Protein Source"
              onPress = {() => handleFilter("Protein Source")}
            />
          </View>
          <View style={tw`justify-center items-center pr-5`}>
            <ButtonTemplate
              type = {selectedNutri?.includes("Carbohydrate Source") ? "filter-clicked" : "filter"} 
              size = 'med' 
              text = "Carbohydrate Source"
              onPress = {() => handleFilter("Carbohydrate Source")}
            />
          </View>
        </View>

        <View style={tw`flex-row`}> 
          <View style={tw`justify-center items-center pl-5 pr-2`}>
            <ButtonTemplate
              type = {selectedNutri?.includes("Low in Sugar") ? "filter-clicked" : "filter"} 
              size = 'med' 
              text = "Low in Sugar"
              onPress = {() => handleFilter("Low in Sugar")}
            />
          </View>
          <View style={tw`justify-center items-center pr-5 pr-2`}>
            <ButtonTemplate
              type = {selectedNutri?.includes("Low Fat") ? "filter-clicked" : "filter"} 
              size = 'med' 
              text = "Low Fat"
              onPress = {() => handleFilter("Low Fat")}
            />
          </View>
          <View style={tw`justify-center items-center pr-5`}>
            <ButtonTemplate
              type = {selectedNutri?.includes("Low Fat") ? "filter-clicked" : "filter"} 
              size = 'med' 
              text = "Price: < 50"
              onPress = {() => handleFilter("Low Fat")}
            />
          </View>
        </View>
      </View>

      <View style={tw`items-end mt-1 pr-5`}>
        <ButtonTemplate
          type = "green"
          size = 'med' 
          text = "GO"
          onPress = {() => handleRandom()}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});