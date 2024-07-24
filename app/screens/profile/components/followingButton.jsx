import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const FollowingButton = () => {

    const navigation = useNavigation()

    const following = () => {
        navigation.navigate("screens/following/index")
    }

    return (
        <View>
            <ButtonTemplate
                type = 'no-bg' 
                size = 'sm' 
                text = 'following' 
                onPress = { following }
                testId = "following"
            />
        </View>
    );
};

export default FollowingButton;