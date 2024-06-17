import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import tw from 'twrnc';

export default function AgendaComponent() {
    return (
        <SafeAreaView style={tw `flex-1 justify-center`}>
            <Agenda
                selected=""
                items={{
                    '2024-06-16': [{name: 'Eat salad', frequency: '3 times a week', period: '2024-06-01 to 2024-06-30'}, {name: 'Exercise', frequency: '4 times a week', period: '2024-06-01 to 2024-06-30'}],
                    '2024-06-17': [{name: 'Eat salad', frequency: '3 times a week', period: '2024-06-01 to 2024-06-30'}]
                }}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={tw `bg-white flex-1 rounded-lg pl-3 pt-2 pb-3 mt-4 mr-6`}>
                        <Text style={tw `font-bold text-lg text-green-700`}>{item.name}</Text>
                        <Text style={tw `text-black`}>{item.frequency}</Text>
                        <Text style={tw `text-black`}>{item.period}</Text>
                    </TouchableOpacity>
                )}
                renderEmptyDate={() => (
                    <View style={tw `flex-1 items-center`}>
                        <Text style={tw `font-bold text-lg text-black`}> 
                            No habit scheduled today. 
                        </Text>
                    </View>
                )}
                theme={{
                    agendaDayTextColor: 'gray',
                    agendaDayNumColor: 'gray',
                    agendaTodayColor: 'green',
                    agendaKnobColor: 'green',
                    selectedDayBackgroundColor: 'green',
                    selectedDayTextColor: 'white',
                    dotColor: 'green',
                    todayTextColor: 'green'
                }}
            /> 
        </SafeAreaView>
    );
};