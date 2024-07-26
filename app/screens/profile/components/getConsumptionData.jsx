import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

// purpose: fetches the user's consumption data from firebase
export const getConsumptionData = async () => {
    try {
        const q = query(collection(db, "Consumption"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const FoodList = querySnapshot.docs.map(doc => doc.data());
        setFood(FoodList);
    } catch (error) {
        alert('Error fetching user data. ' + error.message)
    } 
};