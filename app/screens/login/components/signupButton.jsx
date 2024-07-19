import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const signupText = () => {

    const navigation = useNavigation()

    const leadToSignup = () => {
        navigation.navigate("screens/signup/index")
    }

    return (
        <View style={tw`flex-row`}>
            <Text style={tw`text-black text-center mr-2 mt-0.4`}>
                Don't have an account yet?   
            </Text>

            <ButtonTemplate
              type = 'no-bg' 
              size = 'sm' 
              text = 'Sign up!' 
              onPress = {leadToSignup}
              testId="signupButton"
            />
      </View>
    );
};

export default signupText;