import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import ButtonTemplate from "../../../components/buttonTemplate";
import tw from 'twrnc';

const Filter = () => {
    const [searchText, setSearchText] = useState("");

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        console.log(searchText);
    };

    return (
        <View style={tw`flex justify-between flex-row px-4 py-1`}>
            <TextInput
                onChangeText={handleSearchTextChange}
                style={tw`w-5/6 p-3 bg-white rounded-xl mb-3 border border-gray-400`}
                placeholder="I want to eat ... "
            />
            <View style={tw``}>
            <ButtonTemplate
                type = 'search' 
                size = 'med' 
                text = 'Go  ' 
                onPress = {handleSearchTextChange}
            />
            </View>

        </View>
    );
};

export default Filter;