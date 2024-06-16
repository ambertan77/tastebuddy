import { View, Text } from "react-native";
import tw from 'twrnc';

const Header = () => {
    return (
        <View style={tw`h-25 border border-gray-400`}>
            <Text style={tw`text-green-700 text-xl mt-15 text-center font-bold`}>
                calendar
            </Text>
        </View>
    );
};

export default Header;