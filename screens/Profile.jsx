import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { app } from '../firebase/config'
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';


const mainBackground = require('../assets/images/main.jpg');
const icon = require('../assets/images/calendar.jpeg');
const picon = require('../assets/images/person.png');

export default function Profile() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [firstname, setfirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState("");
  useEffect(() => {
    handelGetUser();
  }, []);

  const handelGetUser = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setName(data.username);
      setEmail(data.email);
      setPhoto(data.profileUrl);
      setfirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      console.log(photo);


    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  };

  const handel = () => {
    handelGetUser();
    console.log(name);

  }

  return (


    <View style={styles.container}>
      <ImageBackground source={mainBackground} style={styles.background} >
        <Header />



        <View style={styles.profileView}>
          
        <View style={styles.profileitem}>
        <View style={styles.photocircle}>
          <View style={styles.photo}>
            <     Image source={{ uri: photo }} style={styles.profileimage} />

          </View>
          </View>
          

            <View style={styles.cont1}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />

              <Text style={styles.nameprofile} >User Name :</Text>
              <Text style={styles.nameprofile} >{name} </Text>
            </View>

            <View style={styles.cont1}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />

              <Text style={styles.nameprofile} >First Name :</Text>
              <Text style={styles.nameprofile} >{firstname} </Text>
            </View>

            <View style={styles.cont1}>
              <AntDesign name="user" size={24} color="black" style={styles.icon} />

              <Text style={styles.nameprofile} >Last Name :</Text>
              <Text style={styles.nameprofile} >{lastname} </Text>
            </View>

            <View style={styles.cont1}>
              <AntDesign name="mail" size={24} color="black" style={styles.icon} />
              <Text style={styles.nameprofile} >Email :</Text>
              <Text style={styles.nameprofile} >{email} </Text>
            </View>

            <View style={styles.cont1}>
              <AntDesign name="phone" size={24} color="black" style={styles.icon} />

              <Text style={styles.nameprofile} >Phone:</Text>
              <Text style={styles.nameprofile} >{phone} </Text>
            </View>
            <View style={styles.cont2}>
            < Image  source={icon} style={styles.icons}/>
            <Pressable style={styles.button} onPress={() => router.replace("/Reservation")} > 
            <Text style={styles.buttonText}>Reservations</Text> 
          </Pressable>
          </View>
          </View>

        </View>




      </ImageBackground>





    </View>
  )



};
const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  photo: {
    borderRadius: 999,
    backgroundColor: 'yellow',
    width: 120,
    height: 120,

   
    alignItems:'center',
    justifyContent:'center'
    



  },
  photocircle: {
    borderRadius: 999,
    backgroundColor: '#F4C14C',
    width: 125,
    height: 125,

    marginLeft: 10,
    alignItems:'center',
    justifyContent:'center'
    



  },
  profileimage: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: 'yellow',
    width: "100%",
    



  },
  background: {
    flex: 1,
    resizeMode: 'cover',

  },


  nameprofile: {
    color: '#F4C14C',
    fontSize: 20,

   


  },
  profileitem: {
    backgroundColor: 'rgba(300, 120, 0, 0.3)',
    padding: 20,
    marginVertical: 8,
    width: '90%',
    height: 600,
    borderRadius: 50,
    marginLeft: 25,


  },
  profileView: {
   
    marginTop: 100,
  },
  icons: {
    borderRadius: 999,
    backgroundColor: 'yellow',
    width: 30,
    height: 30,
    marginTop:5
  },
  icon: {
    marginRight: 10,
  },
  cont1: {
    flexDirection: 'row',
    marginVertical: 20
  },
 cont2:{
  backgroundColor:'#F4C14C',
  alignContent:'center',
   justifyContent:'center',
   width:'70%',
   height:40,
   borderRadius:20,
   flexDirection:'row',
   
 }

});