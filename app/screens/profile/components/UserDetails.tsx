import { View, Text } from "react-native";
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import ProfilePic from "../components/pfp";
import UsernameText from "../../../components/username";
import ButtonTemplate from "@/app/components/buttonTemplate";


const UserDetails = () => {

    const navigation = useNavigation()

    const followers = () => {
        navigation.navigate("index" as never)
    }

    return (
        <View style={tw`flex-row p-5`}>
            <ProfilePic />

            <View style={tw`p-5`}>
                <UsernameText />
            </View>
            
        </View>
    );
};

export default UserDetails;