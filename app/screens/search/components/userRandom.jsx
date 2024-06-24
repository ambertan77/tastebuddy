import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const fetchRandom = async () => {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(userRef);
    const random = docSnap.data()?.random;
    return random;
};

export default fetchRandom;
