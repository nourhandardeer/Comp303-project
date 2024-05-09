import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/header';
import { collection, addDoc, getDocs, query, where,doc,setDoc,getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { app, auth } from '../firebase/config'
import { getAuth } from "firebase/auth"


const CalendarInput = () => {
  const { id, price, hotelname, place } = useLocalSearchParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hotelDate, sethotelDate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchHotelDetails = async () => {
  //     try {
  //       const hotelDocRef = doc(db, 'hotels', id);
  //       const docSnap = await getDoc(hotelDocRef);

  //       if (docSnap.exists()) {
  //         setHotelDetails(docSnap.data());

  //       } else {
  //         setError('Hotel details not found.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching hotel details:', error);
  //       setError('Failed to fetch hotel details. Please try again later.');
  //     } 
  //   };

  //   if (id) {
  //     fetchHotelDetails();
  //   }
  // }, [id]);


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


    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setError('Failed to fetch hotel details. Please try again later.');
    }

  };

  const addNewReservation = async (reservationId) => {
    try {
        // Ensure required fields are not empty
        if (!auth.currentUser || !name || !email || !hotelname || !price || !selectedDate) {
            throw new Error("Missing required fields.");
        }

        await setDoc(doc(db, "Reservations",reservationId), {
            userId: auth.currentUser.uid,
            hotelId:id,
            username: name,
            email: email,
            hotelName: hotelname,
            hotelPrice: price,
            hotelDate: selectedDate,
            placehotel:place
        });
        // Navigate to login screen after successful registration

    } catch (error) {
        console.error('Error adding:', error);

        // Handle specific errors
        if (error.code === "permission-denied") {
            setError("Permission denied. Please contact support.");
        } else {
            setError("Failed to add. Please try again.");
        }
    }
};
  const showDatePicker = () => {
    setDatePickerVisibility(true);

  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    console.log(id);
    console.log(place);
    console.log(email);
    console.log((auth.currentUser.uid+hotelname))


  };


  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Text style={styles.heder}> User Name : {name}</Text>
      <Text style={styles.heder}>Email: {email}</Text>
      <Text style={styles.heder}>Hotel Name : {hotelname}</Text>
      <Text style={styles.heder}>Price: {price}</Text>
      <View style={styles.datestyle}>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={{ marginTop: 20, padding: 10, borderWidth: 1, width: 210, height: 40, borderColor: '#D8A123' }}
          placeholder="Selected Date"
          value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
          editable={false}
        />

        <Pressable style={{ backgroundColor: '#D8A123', width: 60, height: 40, padding: 10, marginTop: 20 }}
          onPress={showDatePicker} >
          <Text>select date</Text>
        </Pressable>
      </View>

      <TouchableOpacity style={styles.bookstyle} onPress={()=>addNewReservation(auth.currentUser.uid+id)}>
        <Text style={styles.bookTitle}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
  },
  datestyle: {
    flex: 0.1,
    flexDirection: 'row'
  },
  bookstyle: {
    backgroundColor: '#D8A123',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 35,
    borderRadius: 20,

    marginVertical: 30
  },
  bookTitle: {
    alignContent: 'center',
    justifyContent: 'center',

  },
  heder: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    width: 270,
    height: 40,
    borderColor: '#D8A123',
    borderRadius: 20,
  }
})
export default CalendarInput;