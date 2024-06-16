import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';

export default function CalendarComponent() {
    return (
        <SafeAreaView style={tw `flex-1 top-0 w-full`}>
            <Calendar />
        </SafeAreaView>
    );
};