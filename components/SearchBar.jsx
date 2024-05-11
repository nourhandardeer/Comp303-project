import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRoute, useRouter } from 'expo-router';

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [hotels, setHotels] = useState([]);

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

  const searchItems = (searchFor) => {
    console.log('searchFor', searchFor);
    const filteredHotels = hotels.filter((item) =>
      item.name.toLowerCase().includes(searchFor.toLowerCase())
    );
    const hotelIds = filteredHotels.map((hotel) => hotel.id);
    return hotelIds;
  }

  const router = useRouter();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          const hotelIds = searchItems(name);
          if (hotelIds.length > 0) {
            router.push({ pathname: '/hotelDetails', params: { id: hotelIds[0] } });
          } else {
            console.log('No hotels found with the given name.');
          }
        }}
      >
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    paddingVertical: 10,
    color:'white'
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#D8A123',
    borderRadius: 5,
  },
});

export default SearchBar;
