import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native'; 
import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase/config'; 
import { app } from '../firebase/config' 
import { getAuth } from "firebase/auth"; 
import Header from '../components/header'; 
 
export default function Reservation() { 
    const [error, setError] = useState(null); 
    const [reservervations, setReservations] = useState(null); 
    const auth = getAuth(app); 
    useEffect(() => { 
        handelGetUseReservation(); 
      }, []); 
 
      let y=[]; 
      const handelGetUseReservation = async () => { 
 
        try { 
        const Ref = collection(db, "Reservations"); 
        const q = query(Ref, where("userId", "==", auth.currentUser.uid)); 
         
        const querySnapshot = await getDocs(q); 
        
         
        querySnapshot.forEach((doc) => { 
          
          // doc.data() is never undefined for query doc snapshots 
         
          y.push({...doc.data()}); 
        
          //console.log(doc.id, " => ", doc.data(),"nadaaaaaaaaaaaa"); 
 
        }); 
    }catch (error) { 
        console.error('Error fetching user:', error); 
        setError('Failed to fetch user reservations. Please try again later.'); 
        // Handle error 
      } 
    //console.log(y) 
     
    setReservations(y); 
    //console.log(reservervations) 
      }; 
      const renderItem = ({ item }) => ( 
        <View  style={styles.hotelItem}> 
            
 <Text >Hotel Name : {item.hotelName}</Text> 
 <Text > Total price :{item.hotelPrice}</Text> 
 <Text >City: {item.placehotel}</Text> 
 <Text >Check in Date:{item.checkinDate}</Text> 
 <Text >Check out Date : {item.checkoutDate}</Text> 
 <Pressable> 
    <Text style={styles.bookTitle}>Cancel</Text> 
 </Pressable> 
        </View> 
      ); 
 
return( 
<View style={styles.container}> 
  <Header/> 
    <View style={styles.bookstyle}> 
<Text> Your Reservervations</Text> 
</View> 
<FlatList style={styles.list} 
        data={reservervations} 
        renderItem={renderItem} 
        keyExtractor={(item, index) => index.toString()} 
        contentContainerStyle={styles.listContent} 
      /> 
     
</View> 
); 
 
 
}; 
const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      paddingTop: 20, // Add padding at the top 
      paddingHorizontal: 20, 
    }, 
    darkBackground: { 
      backgroundColor: '#333', // Dark mode background color 
    }, 
    listContent: { 
      paddingBottom: 20, // Add padding at the bottom 
    }, 
    hotelItem: { 
      marginBottom: 20, 
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderRadius: 10, 
      overflow: 'hidden', 
      position: 'relative', 
    }, 
  
    
    list:{ 
      marginTop:30, 
    }, 
    bookstyle:{ 
  backgroundColor:'#D8A123', 
  alignItems:'center', 
   justifyContent:'center', 
   width:'50%', 
   height:35, 
   marginLeft:90, 
    
    }, 
    bookTitle:{ 
       
   marginLeft:150, 
   color:'#D8A123', 
   marginVertical:10 
    } 
  });