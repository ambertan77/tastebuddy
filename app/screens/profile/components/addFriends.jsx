import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const AddFriends = ({ onPress }) => {

    const navigation = useNavigation()

    // const add = () => {
    //     navigation.navigate("screens/userlist/index")
    // }

    return (
        <View style={tw`items-start px-5`}>
            <ButtonTemplate
                type = 'add' 
                size = 'med' 
                text = '+ ADD FRIENDS' 
                onPress = {onPress}
                testId= "addFriends"
            />
        </View>
    );
};

export default AddFriends;