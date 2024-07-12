import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const fetchReviews = async () => {
    const uid = auth.currentUser.uid;
    const q = query(collection(db, "Users", uid, "Reviews"));
    const querySnapshot = await getDocs(q);
    const allReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return allReviews;
};

export default fetchReviews;