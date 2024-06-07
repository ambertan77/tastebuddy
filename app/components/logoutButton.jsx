import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from 'expo-router';
import tw from 'twrnc';


export default function LogoutButton() {

  const navigation = useNavigation();
  
  return (

    <TouchableOpacity onPress={() => navigation.navigate('index')}>
      <Text style={tw`text-green-900 text-center font-bold text-lg`}>
        Log out
      </Text>
    </TouchableOpacity>
    
  );

};