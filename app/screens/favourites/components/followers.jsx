import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

// purpose: fetch all users that follow the current user from firebase
export const fetchUsers = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "Users", uid, "Followers"), where('uid', '!=', null));
    const querySnapshot = await getDocs(q);
    const allFollowers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allFollowers;
};
