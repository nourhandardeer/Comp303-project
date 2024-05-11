import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable,TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where ,doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { app } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import Header from '../components/header';

export default function Reservation() {
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const auth = getAuth(app);

  useEffect(() => {
    handelGetUserReservation();
  }, []);

  const handelGetUserReservation = async () => {
    try {
      const q = query(collection(db, 'Reservations'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const reservationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      setError('Failed to fetch user reservations. Please try again later.');
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      // Implement cancellation logic here

      await deleteDoc(doc(db, "Reservations", reservationId));
      const q = query(collection(db, 'Reservations'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const reservationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationsData);
    
      console.log('Cancel reservation:', reservationId);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setError('Failed to cancel reservation. Please try again later.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Text style={styles.detailText}>Hotel Name: {item.hotelName}</Text>
      <Text style={styles.detailText}>Total Price: {item.hotelPrice}</Text>
      <Text style={styles.detailText}>City: {item.placehotel}</Text>
      <Text style={styles.detailText}>Check-in Date: {item.checkinDate}</Text>
      <Text style={styles.detailText}>Check-out Date: {item.checkoutDate}</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelReservation(item.id)}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bookstyle}>
        <Text style={styles.title}>Your Reservations</Text>
      </View>
      <FlatList
        style={styles.list}
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  hotelItem: {
    marginBottom: 20,
    backgroundColor: '#D8A123', // Same color as the buttons
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize:16,
    fontWeight: 'bold',
    color: 'black', // Same color as the buttons
  },
  bookstyle: {
    paddingTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 35,
    alignSelf: 'center',
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color is white
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'black', // Text color is white
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#D8A123', // Same color as the buttons
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  cancelButtonText: {
    color: 'black', // Text color is white
    fontWeight: 'bold',
  },
});
