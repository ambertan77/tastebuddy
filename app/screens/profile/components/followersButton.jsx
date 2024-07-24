import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const FollowersButton = () => {

    const navigation = useNavigation()

    const followers = () => {
        navigation.navigate("screens/followers/index");
    }

    return (
        <View style={tw`pr-3`}>
            <ButtonTemplate
                type = 'no-bg' 
                size = 'sm' 
                text = 'followers' 
                onPress = { followers }
                testId = "followers"
            />
        </View>
    );
};

export default FollowersButton;