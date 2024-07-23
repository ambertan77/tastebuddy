import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

export const fetchFood = async () => {
    const querySnapshot = await getDocs(collection(db, "Food"));
    const foodList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return foodList;
};
