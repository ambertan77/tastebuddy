import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useRoute, useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const NavigationTab = ({ currentRoute }) => {
    const tabs = [
        { icon: "heart", path: "screens/favourites", text: "favourites" },
        { icon: "calendar-check", path: "screens/calendar", text: "habit log" },
        { icon: "search", path: "screens/search", text: "search" },
        { icon: "bell", path: "screens/feed", text: "feed" },
        { icon: "user", path: "screens/profile", text: "profile" },
    ];

    return (
        <View style={tw`bg-white flex flex-row justify-between items-center pl-8 pr-8 border border-gray-400`}>
            {tabs.map((tab) => (
                <Link key={tab.icon} href={tab.path} className="flex flex-col">
                    <View style={tw`pt-5 pb-6`}>
                        <Icon name={tab.icon} size={27} color={tab.path === currentRoute ? "green" : "grey"} />
                    </View>
                </Link>
            ))}
        </View>
    );
};

export default NavigationTab;