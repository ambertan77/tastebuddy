import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc'

const CustomLoadingIndicator = () => {
    return (
        <View style={tw `flex-1 justify-center items-center`}>
            <Text style={tw `font-bold text-lg text-green-700`}> 
                Click on a date in the weekly view above to start!
            </Text>
        </View>
    );
};

export default CustomLoadingIndicator;