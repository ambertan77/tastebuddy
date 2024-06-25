import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import tw from 'twrnc';

const NavigationTab = () => {
    const tabs = [
        { icon: "heart", path: "/screens/favourites" },
        { icon: "calendar-check", path: "screens/calendar" },
        { icon: "search", path: "screens/search" },
        { icon: "bell", path: "screens/feed" },
        { icon: "user", path: "screens/profile" },
    ];

    return (
        <View style={tw`bg-white flex flex-row justify-between items-center pl-8 pr-8 border border-gray-400`}>
            {tabs.map((tab) => (
                <Link href={tab.path} className="flex flex-col">
                    <View style={tw`pt-5 pb-6`}>
                        <Icon name={tab.icon} size={27} color="green" />
                    </View>
                </Link>
            ))}
        </View>
    );
};

export default NavigationTab;