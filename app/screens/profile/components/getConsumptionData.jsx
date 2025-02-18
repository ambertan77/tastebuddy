import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where, getFirestore } from "firebase/firestore";
import tw from 'twrnc';

export const getConsumptionData = async () => {
    const uid = auth.currentUser.uid;
    try {
        const q = query(collection(db, "Consumption"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const FoodList = querySnapshot.docs.map(doc => doc.data());
        return FoodList;
    } catch (error) {
        alert('Error fetching user data. ' + error.message)
        const FoodList = [];
        return FoodList;
    }
}