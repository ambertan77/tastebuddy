import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const LoginText = () => {

    const navigation = useNavigation()

    const leadToLogin = () => {
        navigation.navigate("screens/login/index")
      }

    return (
        <View style={tw`flex-row`}>
            <Text style={tw`text-black text-center mr-2 mt-0.4`}>
                Have an existing account?
            </Text>

            <ButtonTemplate
              type = 'no-bg' 
              size = 'sm' 
              text = 'Login!' 
              onPress = {leadToLogin}
              testId="loginButton"
            />
      </View>
    );
};

export default LoginText;