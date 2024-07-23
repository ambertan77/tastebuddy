import React, {useState, useEffect} from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from 'expo-router';
import CustomLoadingIndicator from './loadingIndicator';

export default function AgendaComponent() {

    const uid = auth.currentUser.uid;

    const [habits, setHabits] = useState({});
    const [habitsId, setHabitsId] = useState([]);
    const [loading, setLoading] = useState(true);

    // purpose: fetch the habits data from the database and filter by user
    // ensure that the habits data is fetched everytime there is a change to the habit collection
    const fetchAgendas = async () => {
        const q = query(collection(db, "Users", uid, 'Habits'), where('date', '!=', null));
        onSnapshot(q, (querySnapshot) => {
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
                    id: item.id,
                    name: item.name,
                    frequency: item.frequency,
                    period: item.period
                });
                console.log(acc);
                return acc;
            }, Object.create({}));
            console.log(formattedItems);
            setHabits(formattedItems);
        });
    }

    // purpose: put all the dates in this current month into an array
    const getAllDatesInCurrentMonth = (month) => {
        const currentYear = month.year;
        const currentMonth = month.month - 1; 
        // set to first day of the current month
        var date = new Date(currentYear, currentMonth, 1);
        var dates = [];

        // create empty array of habits for each day in this month
        while (date.getMonth() === currentMonth) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
            const formattedDate = year + "-" + month + "-" + day
            dates.push(formattedDate);
            // set date to the next date
            date.setDate(date.getDate() + 1);
        }
        
        console.log(dates);
        return dates;
    };

    // purpose: to update the habit dictionary such that all dates are keys in the dictionary
    const loadItemsForMonth = async (month) => {
        const dates = getAllDatesInCurrentMonth(month);
        const updatedHabits = {};
        
        // for each date, create an empty array if it has no existing added habit 
        dates.forEach((date) => {
            if (!habits[date]) {
                updatedHabits[date] = [];
            }
        });
        
        // merge the current list of habits with the updated list (containing dates with empty arrays)
        setHabits(currentHabits => ({ ...currentHabits, ...updatedHabits }));
    };

    const getFormattedDateToday = () => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        const formattedDate = year + "-" + month + "-" + day
        return formattedDate;
    }

    const formattedDateToday = getFormattedDateToday();

    useEffect(() => {
        fetchAgendas()
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        loadItemsForMonth(currentMonth)
    }, []);

    const navigation = useNavigation();

    const [item, setItem] = useState({});

    // purpose: function to delete a habit document from the Habits collection
    const handleTrash = async (id) => {
        await deleteDoc(doc(db, "Users", uid, "Habits", id));
        const edittedIds = habitsId.filter((habitId) => habitId != id);
        setHabitsId(edittedIds);
    }

    useEffect(() => {
        console.log(habitsId);
    }, [habitsId])

    // give instructions if the user just opened the calendar page instead of showing the loading indicator
    if (loading) {
        setLoading(false);
        return <CustomLoadingIndicator />;
    }
            
    return (
        <SafeAreaView style={tw `flex-1 justify-center`}>
            <Agenda
                selected={ formattedDateToday }
                items={ habits }
                renderItem={ item => (   
                    <View style={tw `bg-white flex-row rounded-lg pl-3 pt-2 pb-3 mt-4 mr-6`}>
                        <View style={tw `flex-1`}>
                            <Text style={tw `font-bold text-lg text-green-700`}>{item.name}</Text>
                            <Text style={tw `text-black`}>{item.frequency}</Text>
                            <Text style={tw `text-black`}>{item.period}</Text> 
                        </View>
                        <TouchableOpacity style={tw `items-end mr-5 justify-center`} onPress={() => handleTrash(item.id)}>
                            <Icon name="trash" size="20" color="green" />
                        </TouchableOpacity>
                    </View>
                )}
                renderEmptyData={() => <CustomLoadingIndicator/> }
                loadItemsForMonth={ loadItemsForMonth }
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