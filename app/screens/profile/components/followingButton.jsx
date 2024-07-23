import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const FollowingButton = ({ onPress }) => {

    const navigation = useNavigation()

    return (
        <View>
            <ButtonTemplate
                type = 'no-bg' 
                size = 'sm' 
                text = 'following' 
                onPress = {onPress}
                testId = "following"
            />
        </View>
    );
};

export default FollowingButton;