import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

const Cairo = () => {
  // State to store hotels data fetched from Firestore
  const [hotels, setHotels] = useState([]);
  // State to track favorite hotels
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchHotelsFromFirestore = async () => {
      try {
        const hotelsCollectionRef = collection(db, 'hotels');
        const querySnapshot = await getDocs(hotelsCollectionRef);
        const hotelsData = querySnapshot.docs.map(doc => doc.data());
        setHotels(hotelsData);
        
      } catch (error) {
        console.error('Error fetching hotels from Firestore:', error);
      }
    };

    // Fetch hotels data from Firestore
    fetchHotelsFromFirestore();
  }, []);

  // Filter hotels based on destination 'Cairo'
  const cairoHotels = hotels.filter(hotel => hotel.destination === 'Cairo');

  // Function to handle adding a hotel to favorites
  const addToFavorites = (hotelId) => {
    // Check if the hotel is already in favorites
    if (!favorites.includes(hotelId)) {
      // Add the hotel to favorites
      setFavorites([...favorites, hotelId]);
    } else {
      // Remove the hotel from favorites
      setFavorites(favorites.filter(id => id !== hotelId));
    }
  };

  // Render hotel item component
  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Image source={{ uri: item.photoURL }} style={styles.hotelImage} />
      <TouchableOpacity onPress={() => addToFavorites(item.id)} style={styles.favoriteIcon}>
        <FontAwesome name="heart" size={24} color={favorites.includes(item.id) ? 'red' : '#888'} />
      </TouchableOpacity>
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
        data={cairoHotels}
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
  hotelImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  hotelDetails: {
    padding: 15,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff', // Text color in dark mode
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  destination: {
    marginLeft: 5,
    fontSize: 16,
    color: '#aaa', // Text color in dark mode
  },
  hotelDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc', // Text color in dark mode
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Cairo;
