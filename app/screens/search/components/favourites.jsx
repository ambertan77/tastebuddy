import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

export const fetchFavs = async () => {
    const user = auth.currentUser;
    const querySnapshot = await getDoc(doc(db, "Users", user.uid));
    const favList = querySnapshot.data()?.favourites;
    return favList;
};