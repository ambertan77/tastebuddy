import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import tw from 'twrnc';
import { useNavigation  } from "@react-navigation/native";

export default function backButton ( {onPress} ) {
    return (
        <TouchableOpacity style={tw `items-start ml-3 mt-13`} onPress={onPress} testID='goBack'>
            <Icon name="chevron-left" size="20" color="white" />
        </TouchableOpacity>
    );
};