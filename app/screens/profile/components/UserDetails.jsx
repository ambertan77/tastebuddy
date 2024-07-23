import { View, Text } from "react-native";
import tw from 'twrnc';
import { useNavigation } from 'expo-router';
import ProfilePic from "./pfp";
import UsernameText from "../../../components/username";
import ButtonTemplate from "@/app/components/buttonTemplate";
import FollowersButton from '../components/followersButton'
import FollowingButton from '../components/followingButton'

// (1) show the user's username
// (2) provide the followers and following buttons to navigate to those pages
const UserDetails = ({ onPress }) => {

    const navigation = useNavigation()

    const followers = () => {
        navigation.navigate("screens/followers/index")
    }

    const following = () => {
        navigation.navigate("screens/following/index")
    }
    
    return (
        <View style={tw`flex flex-row p-5`}>
            <ProfilePic />

            <View style={tw`px-5 justify-center`}>
                <UsernameText />

                <View style={tw`flex-row`}>
                    <FollowersButton onPress={followers} />
                    <FollowingButton onPress={following} />
                </View>
            </View>
            
        </View>
    
    );
};

export default UserDetails;