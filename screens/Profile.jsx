import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground,Image,TouchableOpacity,Pressable } from 'react-native';
import { collection, addDoc, getDocs, query, where,doc,setDoc,getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import {app} from '../firebase/config'
import {  getAuth } from "firebase/auth";
import Header from "../components/header";


const mainBackground = require('../assets/images/main.jpg');
const icon = require('../assets/images/iconE.jpeg');
const picon = require('../assets/images/person.png');

export default function Profile(){
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo,setPhoto]=useState('');
  
    useEffect(() => {
        handelGetUser();
    }, []);

    const handelGetUser=async()=>{
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
       
        if (docSnap.exists()) {
          //console.log("Document data:", docSnap.data());
          const data= docSnap.data();
          setName(data.username);
          setEmail(data.email);
          setPhoto(data.profileUrl)
        
         console.log( photo)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      
      };

    const handel=()=>{
        handelGetUser();
    console.log(name);
    
    }

return(


    <View style={styles.container}>
        <ImageBackground source={mainBackground} style={styles.background} >
          <Header/>
        


        <View style={styles.profileView}>
        <View style={styles.photo}>
   <     Image  source={ {uri:photo}} style={styles.profileimage}/>

        </View>
        <View style={styles.profileitem}>
            <View style={{flexDirection:'row'}}>
            <Image  source={picon} style={styles.icons}/>
        <Text style={styles.nameprofile} >User Name :</Text>
        <Text style={styles.nameprofile} >{name} </Text>
        </View>
        <View style={{flexDirection:'row',marginVertical:20}}>
            <Image  source={icon} style={styles.icons}/>
        <Text style={styles.nameprofile} >Email :</Text>
        <Text style={styles.nameprofile} >{email} </Text>
        </View>

        </View>
        
        </View>
       
        
        

        </ImageBackground>

       
        

    <Pressable style={{backgroundColor:'yellow'}}
    onPress={()=>handel()}>
    <Text>
        hello
       
    </Text>
    </Pressable>
</View>
)



};
const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#fff',
       
      },
      photo:{
        borderRadius:999,
        backgroundColor:'yellow',
        width:150,
        height:150,
        
        marginLeft:10
       
       

      },
      profileimage:{
     flex:1,
     borderRadius:999,
        backgroundColor:'yellow',
        width:"100%",
     
       

      },
      background: {
        flex: 1,
        resizeMode: 'cover', 
       
      },
      

     nameprofile: {
        color: '#F4C14C',
        fontSize: 20,
        
        marginLeft:5,
        

      },
     profileitem: {
        backgroundColor: 'rgba(300, 120, 0, 0.3)',
        padding: 20,
        marginVertical:8,
        width:'90%',
        height:200,
        borderRadius:50,
       marginLeft:25,
      
      
      },
      profileView:{
        marginVertical:20,
        marginTop:70,
      },
      icons:{
        borderRadius:999,
        backgroundColor:'yellow',
        width:30,
        height:30
      }
      
});