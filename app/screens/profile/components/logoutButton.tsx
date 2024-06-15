import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from 'expo-router';
import tw from 'twrnc';

const LogoutButton = () => {

    const navigation = useNavigation()

    const handleLogOut = () => {
        navigation.navigate("index")
    }

    return (
        <View style={tw`items-end pr-4 pt-2`}>
            <ButtonTemplate
                type = 'logout' 
                size = 'med' 
                text = 'Log out' 
                onPress = {handleLogOut}
            />
        </View>
    );
};

export default LogoutButton;