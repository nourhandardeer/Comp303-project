import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams ,router} from "expo-router";
import Header from '../components/header';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const { width } = Dimensions.get('window');
const SLIDESHOW_HEIGHT = 400; // Adjust the height of the slideshow here

const HotelDetails = () => {
  const { id } = useLocalSearchParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDate, setUserDate] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const hotelDocRef = doc(db, 'hotels', id);
        const docSnap = await getDoc(hotelDocRef);

        if (docSnap.exists()) {
          setHotelDetails(docSnap.data());
        } else {
          setError('Hotel details not found.');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setError('Failed to fetch hotel details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!hotelDetails) {
    return (
      <View style={styles.container}>
        <Text>No hotel details found.</Text>
      </View>
    );
  }

  return (
    <View>
    <Header/>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {hotelDetails && hotelDetails.details && (
        <>
          <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
            {hotelDetails.details.photos.map((photo, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri: photo }} style={styles.hotelImage} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.detailsContainer}>
            <Text style={styles.additionalDescription}>{hotelDetails.details.additionalDescription}</Text>
            <View style={styles.facilitiesContainer}>
              <Text style={styles.facilitiesTitle}>Facilities</Text>
              {hotelDetails.details.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityItem}>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.bookstyle} onPress={() => router.push({ pathname: '/Calendar', params: { id:id , price:hotelDetails.price,hotelname :hotelDetails.name,place:hotelDetails.destination } })}>
            <Text style={styles.bookTitle}>Book Now</Text>
          </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#000',
    height: SLIDESHOW_HEIGHT,
  },
  imageItem: {
    width,
  },
  hotelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  additionalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  facilitiesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  facilitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  facilityItem: {
    marginBottom: 10,
  },
  facilityText: {
    fontSize: 16,
    color: '#666',
  },
  bookstyle:{
    backgroundColor:'#D8A123',
    alignContent:'center',
     justifyContent:'center',
     width:'50%',
     height:35,
     borderRadius:20,
     marginLeft:70,
     marginVertical:10
      },
      bookTitle:{
        alignContent:'center',
     justifyContent:'center',
     marginLeft:50
      }
});

export default HotelDetails;
