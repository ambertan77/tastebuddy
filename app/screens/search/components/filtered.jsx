import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import tw from 'twrnc';

const Filter = ({data, input, setSearchText}) => {
    return (
        <View>
            <FlatList data={data} renderItem={({item}) => {
                if (input === "") {
                    return (
                        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.Name}
                            </Text>
                            <Text style={tw`px-3 pt-1 text-amber-700`}>
                            ${item.Price}
                            </Text>
                        </View>
                    )
                }

                if(item.Name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
                            <Text style={tw`px-3 pt-2 font-bold text-xl`}>
                            {item.Name}
                            </Text>
                            <Text style={tw`px-3 pt-1 text-amber-700`}>
                            ${item.Price}
                            </Text>
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