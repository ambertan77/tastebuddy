import { View, Text } from "react-native";
import tw from 'twrnc';

const Header = () => {
    return (
        <View style={tw`h-25 bg-green-700`}>
            <Text style={tw`text-white text-xl mt-15 text-center font-bold`}>
                feed
            </Text>
        </View>
    );
};

export default Header;