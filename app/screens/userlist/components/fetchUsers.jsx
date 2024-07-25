import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

export const fetchUsers = async () => {
    const currentUserUID = auth.currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "Users"));
    const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const edittedData = userList.filter((user) => user.uid != currentUserUID);
    return edittedData;
};