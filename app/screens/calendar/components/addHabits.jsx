import { View, Text } from "react-native";
import ButtonTemplate from '../../../components/buttonTemplate';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const AddHabit = () => {

    const navigation = useNavigation()

    const add = () => {
        navigation.navigate("screens/habit/index")
    }

    return (
        <View style={tw`items-center px-5`}>
            <ButtonTemplate
                type = 'add' 
                size = 'big' 
                text = '+ CREATE NEW HABIT' 
                onPress = {add}
                testId = 'add'
            />
        </View>
    );
};

export default AddHabit;