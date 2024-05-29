import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import tw from 'twrnc';

const NavigationTab = () => {
    const tabs = [
        { icon: "map", path: "/map" },
        { icon: "calendar-check", path: "/calendar" },
        { icon: "search", path: "/search" },
        { icon: "bell", path: "/feed" },
        { icon: "user", path: "/profile" },
    ];

    return (
        <View style={tw`flex flex-row justify-between items-center pl-8 pr-8 `}>
            {tabs.map((tab) => (
                <Link href={tab.path} className="flex flex-col">
                    <View>
                        <Icon name={tab.icon} size={30} />
                        <Text>{tab.name}</Text>
                    </View>
                </Link>
            ))}
        </View>
    );
};

export default NavigationTab;