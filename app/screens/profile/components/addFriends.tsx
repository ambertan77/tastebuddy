import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from 'expo-router';
import tw from 'twrnc';

const AddFriends = () => {

    const navigation = useNavigation()

    const add = () => {
        navigation.navigate("screens/userlist/index")
    }

    return (
        <View style={tw`items-start px-5`}>
            <ButtonTemplate
                type = 'add' 
                size = 'med' 
                text = '+ ADD FRIENDS' 
                onPress = {add}
            />
        </View>
    );
};

export default AddFriends;