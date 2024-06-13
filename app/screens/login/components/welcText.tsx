import { View, Text } from "react-native";
import tw from 'twrnc';

const WelcText = () => {
    return (
        <View>
            <Text style={tw `text-black text-xl font-bold mt-30`}>
                Welcome back!
            </Text>
        </View>
    );
};

export default WelcText;