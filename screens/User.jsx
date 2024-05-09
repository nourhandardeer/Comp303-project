import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView,Image } from 'react-native';
import { useLocation, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import Category from '../components/category';
import Trending from '../components/trending';
import { AntDesign } from '@expo/vector-icons';
import { auth , db } from '../firebase/config';
import { router } from 'expo-router';
import { collection, addDoc, getDocs, query, where,doc,setDoc,getDoc } from 'firebase/firestore';

import Profile from './Profile';

const mainBackground = require('../assets/images/main.jpg');

export default function User() {
  const { id } = useLocalSearchParams(); // Get the userId directly using useLocalSearchParams
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
       
            if (docSnap.exists()) {
              const data = docSnap.data();
              // Check if profileUrl exists before setting it
              if (data && data.profileUrl) {
                setPhoto(data.profileUrl);
               
              } else {
                // If profileUrl is not set or does not exist, handle it accordingly
                console.log("Profile URL not found");
              }
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User signed out successfully");
        router.replace("Home")
        // Perform any additional actions after logout if needed
      })
      .catch(error => {
        console.error("Error signing out:", error);
      });
  };

  
  return (
    <View style={styles.container}>
      <ImageBackground source={mainBackground} style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.headerText}>EgyptToGo</Text>
          <View style={styles.headerButtons}>
         
          <Pressable style={styles.button} onPress={handleLogout}>
              <AntDesign name="logout" size={24} color="white" />
          </Pressable>
          <Pressable onPress={() => router.replace("/Profile")} style={styles.profileImageContainer}>
  {photo ? <Image source={{ uri: photo }} style={styles.profileImage} /> : null}
               </Pressable>
          </View>
        </View>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.qouteText}> Prepare to be enchanted by the wonders of this timeless land,</Text>
            <Text style={styles.qouteText}> where every corner holds a story waiting to be discovered</Text>
          </View>
          <Category />
          <Trending />
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>&copy; 2024 Your App. All rights reserved.</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'rgba(300, 120, 0, 0.3)',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#F4C14C',
    fontSize: 35,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 35,
  },
  qouteText: {
    fontSize: 40,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Futura-CondensedMedium',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#D8A123',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    color: '#fff',
  },
  profileImage: {
    width: 40, // Adjust the width and height as needed
    height: 40,
    borderRadius: 20, // Half of the width or height to make it circular
  },
  profileImageContainer: {
    marginLeft: 10, // Adjust the spacing if needed
  },
});
