import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../firebase';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import tw from 'twrnc';

const UsernameText = () => {

    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");

    const updateUserID = async () => {
        const user = auth.currentUser;
        if (user) {
        setUserID(user.uid)
    }
    }

    const fetchData = async () => {
        if (userID) {
        const querySnapshot = await getDoc(doc(db, "Users", userID));
        setUsername(querySnapshot.data()?.username)
        }
    };  

    useEffect(() => {
        updateUserID();
        fetchData();
    }, [userID])

    useEffect(() => {
        console.log("print userid", userID);
    }, [userID])

    useEffect(() => {
        console.log("print username", username);
    }, [username])
 

  return (
      <View>
          <Text style={tw `text-black text-2xl font-bold`}>
              {username}
          </Text>
      </View>
  );
};

export default UsernameText;
