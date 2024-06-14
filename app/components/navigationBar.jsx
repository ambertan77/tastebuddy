import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import tw from 'twrnc';

const NavigationTab = () => {
    const tabs = [
        { icon: "map", path: "/screens/map" },
        { icon: "calendar-check", path: "screens/calendar" },
        { icon: "search", path: "screens/search" },
        { icon: "bell", path: "screens/feed" },
        { icon: "user", path: "screens/profile" },
    ];

    return (
        <View style={tw`bg-green-700 flex flex-row justify-between items-center pl-8 pr-8 border border-green-700`}>
            {tabs.map((tab) => (
                <Link href={tab.path} className="flex flex-col">
                    <View style={tw`pt-5 pb-5`}>
                        <Icon name={tab.icon} size={30} color="#f4f2d8" />
                    </View>
                </Link>
            ))}
        </View>
    );
};

export default NavigationTab;