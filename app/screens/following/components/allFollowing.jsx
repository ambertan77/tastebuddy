import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

// purpose: fetch all users that the current user follows from firebase
export const allFollowing = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "Users", uid, "Following"), where('uid', '!=', null));
    const querySnapshot = await getDocs(q);
    const allFollowing = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allFollowing;
};