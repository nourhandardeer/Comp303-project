import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { app } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import Header from '../components/header';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const mainBackground = require('../assets/images/main.jpg');
const icon = require('../assets/images/calendar.jpeg');

export default function Profile() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [firstname, setfirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    handelGetUser();
  }, []);

  const handelGetUser = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.username);
      setEmail(data.email);
      setPhoto(data.profileUrl);
      setfirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
    } else {
      console.log('No such document!');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileView}>
      <Text style={styles.profileHeaderText}>Profile</Text>
        <View style={styles.profileitem}>
          <View style={styles.photocircle}>
            <View style={styles.photo}>
              <Image source={{ uri: photo }} style={styles.profileimage} />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileField}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />
              <Text style={styles.fieldLabel}>User Name:</Text>
              <Text style={styles.fieldValue}>{name}</Text>
            </View>
            <View style={styles.profileField}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />
              <Text style={styles.fieldLabel}>First Name:</Text>
              <Text style={styles.fieldValue}>{firstname}</Text>
            </View>
            <View style={styles.profileField}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />
              <Text style={styles.fieldLabel}>Last Name:</Text>
              <Text style={styles.fieldValue}>{lastname}</Text>
            </View>
            <View style={styles.profileField}>
              <AntDesign name="mail" size={24} color="black" style={styles.icon} />
              <Text style={styles.fieldLabel}>Email:</Text>
              <Text style={styles.fieldValue}>{email}</Text>
            </View>
            <View style={styles.profileField}>
              <AntDesign name="phone" size={24} color="black" style={styles.icon} />
              <Text style={styles.fieldLabel}>Phone:</Text>
              <Text style={styles.fieldValue}>{phone}</Text>
            </View>
          </View>
          <Pressable style={styles.button} onPress={() => router.replace('/Reservation')}>
            <View style={styles.buttonContent}>
              <Image source={icon} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Reservations</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Slightly transparent yellow matching button color
  },
  photo: {
    borderRadius: 999,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photocircle: {
    borderRadius: 999,
    backgroundColor: 'rgba(244, 193, 76, 0.8)', // Slightly transparent yellow matching button color
    width: 125,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileimage: {
    borderRadius: 999,
    width: '100%',
    height: '100%',
  },
  profileView: {
    marginTop: 100,
    alignItems: 'center',
    
  },
  profileitem: {
    backgroundColor: 'rgba(244, 193, 76, 0.9)', // Slightly transparent yellow matching button color
    padding: 20,
    marginVertical: 8,
    width: '90%',
    height: 500,
    borderRadius: 50,
    marginLeft: 25,
    marginRight: 25
  },
  profileInfo: {
    marginTop: 20,
  },
  profileField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 2,
  },
  fieldLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldValue: {
    color: 'black',
    fontSize: 19,
  },
  button: {
    backgroundColor: '#D8A123', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  profileHeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  
});
