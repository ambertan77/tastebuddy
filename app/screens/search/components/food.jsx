import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase';
import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const fetchFood = async () => {
    const querySnapshot = await getDocs(collection(db, "Food"));
    const foodList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return foodList;
};

export default fetchFood;
