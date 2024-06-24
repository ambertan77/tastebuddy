import { View, Text, TouchableOpacity, Image } from "react-native";
import { PopUp } from "./popup";
import { useState } from 'react';
import Generator from "./genText";
import tw from 'twrnc';

const floatButton = ({selectedFilters, filteredFood}) => {
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

    return (
        <View style={tw`absolute bottom-5 right-5 items-center justify-center`}>
            <TouchableOpacity 
                style={tw``}
                onPress={() => setIsGeneratorOpen(true)}
            >
                <Image
                    source={require('../components/randgenicon.png')} 
                    style={{width: 60, height: 60}}
                />
            </TouchableOpacity>

            <PopUp id='Generator' isOpen={isGeneratorOpen}>
                <Generator closeModal={() => setIsGeneratorOpen(false)} selectedFilters={selectedFilters} filteredFood={filteredFood}/>
            </PopUp>
        </View>
    );
};

export default floatButton;