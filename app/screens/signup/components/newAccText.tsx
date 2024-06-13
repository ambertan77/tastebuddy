import { View, Text } from "react-native";
import tw from 'twrnc';

const NewAccText = () => {
    return (
        <View>
            <Text style={tw `text-black text-xl font-bold mt-30`}>
                Create a new account!
            </Text>
        </View>
    );
};

export default NewAccText;