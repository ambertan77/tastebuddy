import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from 'expo-router';
import tw from 'twrnc';

const ConsumptionLog = () => {

    const navigation = useNavigation()

    const add = () => {
        // add logic for adding food to history
    }

    const [searchText, setSearchText] = useState("");
    
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        console.log(searchText);
    }

    return (
        <View style={tw`items-center bg-green-800 w-7/8 rounded-lg`}>
            <Text style={tw `items-center text-amber-400 font-bold text-2xl pt-3 pb-1`}>
                Consumption history
            </Text>
            <View style={tw`flex justify-between flex-row px-4 py-1 bg-whitesmoke`}>
                <TextInput
                    onChangeText={handleSearchTextChange}
                    style={tw`w-full p-3 bg-white rounded-xl mb-3`}
                    placeholder="Search consumption history "
                    clearButtonMode="always"
                    autoCapitalize="none"
                    value={searchText}
                />
            </View>
            {/* placeholder food items*/}    
            <View style={tw`h-17 w-4/5 flex rounded-lg bg-white shadow mb-3`}> 
                <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                    Chicken rice
                </Text>
                <Text style={tw`px-3 pt-1 text-amber-700`}>
                    19 June 2024, Dinner 
                </Text>
            </View>
            <View style={tw`h-17 w-4/5 flex rounded-lg bg-white shadow mb-3`}> 
                <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                    Ban mian
                </Text>
                <Text style={tw`px-3 pt-1 text-amber-700`}>
                    19 June 2024, Lunch 
                </Text>
            </View>
            <View style={tw`h-17 w-4/5 flex rounded-lg bg-white shadow mb-3`}> 
                <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                    Kaya Toast
                </Text>
                <Text style={tw`px-3 pt-1 text-amber-700`}>
                    19 June 2024, Breakfast 
                </Text>
            </View>
            <View style={tw`h-17 w-4/5 flex rounded-lg bg-white shadow mb-3`}> 
                <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                    Tonkotsu Ramen
                </Text>
                <Text style={tw`px-3 pt-1 text-amber-700`}>
                    18 June 2024, Dinner 
                </Text>
            </View>
            <View style={tw `mb-2`}>
                <ButtonTemplate 
                    type = 'search' 
                    size = 'med' 
                    text = 'ADD TO FOOD LOG' 
                    onPress = {add}
                />  
            </View>
        </View>
    );
};

export default ConsumptionLog;