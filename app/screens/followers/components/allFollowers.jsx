import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const fetchUsers = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "Users", uid, "Followers"), where('uid', '!=', null));
    const querySnapshot = await getDocs(q);
    const allFollowing = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allFollowing;
};

export default fetchUsers;