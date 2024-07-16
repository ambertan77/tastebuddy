import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../../../firebase.js';
import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const UserList = () => {

    const [user, setUser] = useState([])

    const fetchUser = async () => {
      const currentUserUID = auth.currentUser.uid;
      const q = query(collection(db, "Users"), where('uid', '!=', currentUserUID));
      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUser(userList);
    };

    useEffect(() => {
        fetchUser();
    }, [])
 

  return (
    <ScrollView>
      {food.map(food => (
        <View style={tw`h-20 m-3 flex rounded-lg bg-white shadow`}> 
          <Text style={tw`px-3 pt-2 font-bold text-xl`}>
            {user.username}
          </Text>
        </View> 
      ))}
    </ScrollView>
  );
};

export default UserList;
