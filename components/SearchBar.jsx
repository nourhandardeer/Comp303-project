import React, { useState , useEffect} from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons library
import { hotelsData } from "../data/hotelsData";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { router } from 'expo-router';

const SearchBar = ({ onSearch }) => {
 
  const [name, setName] = useState("");
  const [hotels,setHotels] = useState("");

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
    const filteredHotels = hotelsData.filter((item) =>
      item.name.toLowerCase().includes(searchFor.toLowerCase())
    );
  
    const hotelIds = filteredHotels.map((hotel) => hotel.id);
    return hotelIds;
  }
  


      

   

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(t) => {setName(t); searchItems(t)}}
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => {
        const hotelIds = searchItems(name); // Call searchItems function with the search term
        if (hotelIds.length > 0) {
          // Assuming you want to navigate to the details of the first hotel in the filtered list
          router.push({ pathname: '/hotelDetails', params: { id: hotelIds[0] } });
        } else {
          // Handle case when no hotels are found
          console.log('No hotels found with the given name.');
        }
      }}>
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
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#D8A123',
    borderRadius: 5,
  },
});

export default SearchBar;
