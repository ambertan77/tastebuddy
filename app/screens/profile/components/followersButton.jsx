import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const FollowersButton = ({ onPress }) => {

    const navigation = useNavigation()

    return (
        <View style={tw`pr-3`}>
            <ButtonTemplate
                type = 'no-bg' 
                size = 'sm' 
                text = 'followers' 
                onPress = {onPress}
                testId = "followers"
            />
        </View>
    );
};

export default FollowersButton;