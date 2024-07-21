import { View, Text } from "react-native";
import tw from 'twrnc';
import BackButton from './backButton';
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation()

    const handleBackButton = () => {
        navigation.navigate("screens/profile/index");
    }

    return (
        <View style={tw `flex-row px-1 h-25 bg-green-700`}>
            <BackButton onPress={handleBackButton} testId='backButton' />
            <Text style={tw`text-white text-xl mt-15 text-center font-bold mb-2 ml-31`}>
                following
            </Text>
        </View>
    );
};

export default Header;