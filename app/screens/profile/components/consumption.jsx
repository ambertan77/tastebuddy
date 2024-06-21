import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from 'expo-router';
import tw from 'twrnc';
import UserConsumption from "./userConsumption";

const ConsumptionLog = () => {

    const navigation = useNavigation()

    const [searchText, setSearchText] = useState("");
    
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        console.log(searchText);
    }

    const handleCreate = () => {
        navigation.navigate('screens/profile/addFood');
    }

    return (
        <View style={tw`items-center bg-green-800 w-7/8 rounded-lg`}>
            <Text style={tw `items-center text-white font-bold text-2xl pt-3 pb-1`}>
                Your food log!
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
            <UserConsumption />
            <ButtonTemplate 
                type = 'add'
                text = '+ ADD TO FOOD LOG'
                onPress = {handleCreate}
            />
        </View>
    );
};

export default ConsumptionLog;