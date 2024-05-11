import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity , TextInput } from 'react-native';
import { collection, getDocs,  getDoc , doc ,updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Import auth from Firebase config
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import Header from '../components/header';
import AdminActions from '../components/AdminActions';



const Cairo = () => {
  // State to store hotels data fetched from Firestore
  const [hotels, setHotels] = useState([]);
  // State to track favorite hotels
  const [favorites, setFavorites] = useState([]);
  const params = useLocalSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document from Firestore
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData.admin || false);
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleUpdate = async (hotelId, updatedData) => {
    try {
      // Reference to the hotel document
      const hotelRef = doc(db, 'hotels', hotelId.toString());
      
      // Fetch the hotel document snapshot
      const hotelSnapshot = await getDoc(hotelRef);
      
      // Check if the hotel document exists
      if (hotelSnapshot.exists()) {
        // Update the hotel document in Firestore with the updated data
        await updateDoc(hotelRef, updatedData);
        
        // Log a success message or perform additional actions if needed
        console.log('Hotel updated successfully:', hotelId);
      } else {
        console.error('Hotel document not found:', hotelId);
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };
  
  const handleDelete = async (hotelId) => {
    try {
      // Delete hotel document from Firestore
      await deleteDoc(doc(db, 'hotels', hotelId.toString()));
      
      // Log a success message or perform additional actions if needed
      console.log('Hotel deleted successfully:', hotelId);
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

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
    <TouchableOpacity onPress={() => router.push({ pathname: '/hotelDetails', params: { id: item.id } })}>
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
          {isAdmin && (
            <AdminActions
              hotelId={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <Header />
      <FlatList
        style={styles.list}
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
  list: {
    marginTop: 30,
  },
});

export default Cairo;
