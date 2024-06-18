import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import tw from 'twrnc';
import ButtonTemplate from "@/app/components/buttonTemplate";

const follow = () => {
    // navigation.navigate("index")
}

const Filter = ({data, input, setSearchText}) => {
    return (
        <View>
            <FlatList data={data} renderItem={({item}) => {
                if (input === "") {
                    return (
                        <View style={tw`h-14 m-1 flex-row justify-between rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                            </Text>
                            <View style={tw`pt-1 top-0 items-end pl-2 pr-1.5`}>
                                <ButtonTemplate
                                    type = 'add' 
                                    size = 'med' 
                                    text = '+ FOLLOW' 
                                    onPress = {follow}
                                />
                            </View>
                        </View>
                    )
                }

                if(item.username.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.username}
                            </Text>
                            <View style={tw`items-end pl-2 pr-1.5`}>
                                <ButtonTemplate
                                        type = 'add' 
                                        size = 'med' 
                                        text = '+ FOLLOW' 
                                        onPress = {follow}
                                />
                            </View>
                        </View>
                    )
                }
            }}/>
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor: '#f5f5f5',
    },
});