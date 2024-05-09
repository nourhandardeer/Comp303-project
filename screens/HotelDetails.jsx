import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/header';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';

const { width } = Dimensions.get('window');
const SLIDESHOW_HEIGHT = 400; // Adjust the height of the slideshow here

const HotelDetails = () => {
  const { id } = useLocalSearchParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userReview, setUserReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const hotelDocRef = doc(db, 'hotels', id);
        const docSnap = await getDoc(hotelDocRef);
        console.log (id)

        if (docSnap.exists()) {
          setHotelDetails(docSnap.data());
          setReviews(docSnap.data().reviews || []);
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

  const handleAddReview = async () => {
    try {
      const hotelDocRef = doc(db, 'hotels', id);
      await updateDoc(hotelDocRef, {
        reviews: arrayUnion(userReview),
      });
      setReviews([...reviews, userReview]);
      setUserReview('');
      console.log("added")
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error
    }
  };

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
      <Header />
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
              </View>
            </View>
            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewsTitle}>Reviews</Text>
              {reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewSign}>{"\u2022"}</Text> 
                  <Text style={styles.reviewText}>{review}</Text>
                </View>
              ))}
            </View>
            <View style={styles.addReviewContainer}>
              <TextInput
                style={styles.reviewInput}
                placeholder="Add your review"
                value={userReview}
                onChangeText={setUserReview}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddReview}
              >
                <Text style={styles.addButtonLabel}>Add Review</Text>
              </TouchableOpacity>
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
  reviewsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    marginRight:275
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewSign: {
    fontSize: 16,
    color: '#666',
    marginRight: 5, // Add spacing between the sign and the review text
  },
  reviewText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left', // Align review text to the left
  },
  addReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20, // Add paddingHorizontal for spacing
    justifyContent: 'space-between', // Aligns items to the left and right
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '50%', // Adjust width as needed
  },
  addButton: {
    backgroundColor: '#D8A123',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HotelDetails;
