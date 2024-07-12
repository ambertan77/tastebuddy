import React, {useState, useEffect} from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from 'expo-router';

export default function AgendaComponent() {

    const uid = auth.currentUser.uid;

    const [habits, setHabits] = useState({});

    const fetchAgendas = async () => {
        const q = query(collection(db, "Users", uid, 'Habits'), where('date', '!=', null));
        const querySnapshot = await getDocs(q);
        const habitsList = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            date: doc.data()['date'],
            name: doc.data()['name'],
            frequency: doc.data()['frequency'],
            period: doc.data()['period']
        }));
        const formattedItems = habitsList.reduce((acc, item) => {
            if (!Object.keys(acc).includes(item.date)) {
                acc[item.date] = [];
            }
            acc[item.date].push({ 
                name: item.name,
                frequency: item.frequency,
                period: item.period
            });
            console.log(acc);
            return acc;
        }, Object.create({}));
        console.log(formattedItems);
        setHabits(formattedItems);
    }

    useEffect(() => {
        fetchAgendas()
    }, []);

    useEffect(() => {
        console.log(habits)
      }, [habits])

    const navigation = useNavigation();

    const [item, setItem] = useState({});

    const handleTrash = async (item) => {
        const document = query(doc(db, "Users", uid, "Habits", where('name', '==', item.name)));
        document.deleteDoc();
        // fetchAgendas();
        // navigation.navigate("screens/profile/index")
        //const document = query(doc(db, "Users", uid, "Habits"), where('name', '==', item.name));
        // const querySnapshot = await getDocs(document);
        // querySnapshot.forEach((doc) => {
        //   doc.deleteDoc();
        // });
    };
            
    return (
        <SafeAreaView style={tw `flex-1 justify-center`}>
            <Agenda
                selected=""
                items={ habits }
                renderItem={ item => (   
                    <View style={tw `bg-white flex-row rounded-lg pl-3 pt-2 pb-3 mt-4 mr-6`}>
                        <View style={tw `flex-1`}>
                            <Text style={tw `font-bold text-lg text-green-700`}>{item.name}</Text>
                            <Text style={tw `text-black`}>{item.frequency}</Text>
                            <Text style={tw `text-black`}>{item.period}</Text> 
                        </View>
                        <TouchableOpacity style={tw `items-end mr-5 justify-center`} onPress={() => handleTrash(item.name)}>
                            <Icon name="trash" size="20" color="green" />
                        </TouchableOpacity>
                    </View>
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