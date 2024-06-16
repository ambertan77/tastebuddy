import { View, Text, ScrollView } from "react-native";
import { useNavigation } from 'expo-router';
import Filter from "../components/filter";
import ButtonTemplate from "@/app/components/buttonTemplate";
import tw from 'twrnc';

const Header = () => {

    const navigation = useNavigation()
    const filter = () => {
        navigation.navigate("index")
    }

    return (
        <View>
        <View style={tw`bg-green-700 h-40`}>
            <Text style={tw`text-white text-xl mt-15 text-center font-bold mb-2`}>
                search
            </Text>
            <Filter />
        </View>

        <ScrollView horizontal={true} style={tw`h-15 flex flex-row`}>
            <View style={tw`justify-center pl-2 pr-1.5`}>
            <ButtonTemplate
                    type = 'filter' 
                    size = 'med' 
                    text = 'Protein-rich' 
                    onPress = {filter}
            />
            </View>

            <View style={tw`justify-center p-1.5`}>
            <ButtonTemplate
                    type = 'filter' 
                    size = 'med' 
                    text = 'Carbohydrate-rich' 
                    onPress = {filter}
            />
            </View>

            <View style={tw`justify-center p-1.5`}>
            <ButtonTemplate
                    type = 'filter' 
                    size = 'med' 
                    text = 'Low in Sugar' 
                    onPress = {filter}
            />
            </View>

            <View style={tw`justify-center p-1.5`}>
            <ButtonTemplate
                    type = 'filter' 
                    size = 'med' 
                    text = 'Low Fat' 
                    onPress = {filter}
            />
            </View>
        </ScrollView>

        </View>

    );
};

export default Header;