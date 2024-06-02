import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth, db } from "@/firebase";  
import { doc, getDoc } from 'firebase/firestore';
import tw from 'twrnc';

const UserProfile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(db, 'Users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          } else {
            console.log('This document does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } 
    };
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw `text-green-900 text-4xl font-bold p-3`}>
        {username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UserProfile;