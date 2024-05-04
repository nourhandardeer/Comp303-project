// Aswan.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import { aswanHotelsData } from '../data/aswanHotelsData';

const Aswan = () => {
  const [hotels, setHotels] = useState([]);

  // useEffect(() => {
  //   // Function to update Firestore collection with new hotel data
  //   const updateFirestoreCollection = async () => {
  //     try {
  //       const hotelsCollectionRef = collection(db, 'hotels');
  //       for (const hotel of aswanHotelsData) {
  //         await addDoc(hotelsCollectionRef, hotel);
  //       }
  //     } catch (error) {
  //       console.error('Error updating Firestore collection:', error);
  //     }
  //   };

  //   // Call the function to update Firestore collection
  //   updateFirestoreCollection();
  // }, []);

  useEffect(() => {
    const fetchHotelsFromFirestore = async () => {
      try {
        const hotelsCollectionRef = collection(db, 'hotels');
        const q = query(hotelsCollectionRef, where('destination', '==', 'Aswan'));
        const querySnapshot = await getDocs(q);
        const hotelsData = querySnapshot.docs.map(doc => doc.data());
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error fetching hotels from Firestore:', error);
      }
    };

    fetchHotelsFromFirestore();
  }, []);

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Image source={{ uri: item.photoURL }} style={styles.hotelImage} />
      <View style={styles.hotelDetails}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.destinationContainer}>
          <FontAwesome name="map-marker" size={16} color="#888" />
          <Text style={styles.destination}>{item.destination}</Text>
        </View>
        <Text style={styles.hotelDescription}>{item.description}</Text>
        <Text style={styles.hotelPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  hotelItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hotelDetails: {
    padding: 15,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  destination: {
    marginLeft: 5,
    fontSize: 16,
    color: '#aaa',
  },
  hotelDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc',
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Aswan;
