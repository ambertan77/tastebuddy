import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from 'expo-router';
import tw from 'twrnc';

const LogoutButton = () => {

    const navigation = useNavigation()

    const handlePress = () => {
    }

    return (
        <TouchableOpacity style={tw`absolute bottom-5 right-5`}>
            <Image
                source={require('../components/randgenicon.png')} 
                style={{width: 50, height: 50}}
            />
        </TouchableOpacity>
    );
};

export default LogoutButton;