import { View, Text } from "react-native";
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import ProfilePic from "../components/pfp";
import UsernameText from "../../../components/username";
import ButtonTemplate from "@/app/components/buttonTemplate";

// (1) show the user's username
// (2) provide the followers and following buttons to navigate to those pages
const UserDetails = () => {

    const navigation = useNavigation()

    const followers = () => {
        navigation.navigate("screens/followers/index" as never)
    }

    const following = () => {
        navigation.navigate("screens/following/index" as never)
    }
    
    return (
        <View style={tw`flex flex-row p-5`}>
            <ProfilePic />

            <View style={tw`px-5 justify-center`}>
                <UsernameText />

                <View style={tw`flex-row`}>
                    <View style={tw`pr-3`}>
                        <ButtonTemplate
                            type = 'no-bg' 
                            size = 'sm' 
                            text = 'followers' 
                            onPress = {followers}
                        />
                    </View>
                    <View>
                        <ButtonTemplate
                            type = 'no-bg' 
                            size = 'sm' 
                            text = 'following' 
                            onPress = {following}
                        />
                    </View>
                </View>
            </View>
            
        </View>
    
    );
};

export default UserDetails;