import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Header from '../components/header';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import { app } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import ReviewItem from '../components/ReviewItem'; // Import the ReviewItem component
import StarRating from '../components/StarRating';

const { width } = Dimensions.get('window');
const SLIDESHOW_HEIGHT = 400;

const HotelDetails = () => {
  const auth = getAuth(app);
  const { id } = useLocalSearchParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userReview, setUserReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const scrollViewRef = useRef();

  // Fake ratings for each hotel (setting all ratings to 5)
  const fakeRatings = Array(5).fill(5); 

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const hotelDocRef = doc(db, 'hotels', id);
        const docSnap = await getDoc(hotelDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHotelDetails(data);
          setReviews(data.reviews || []);
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
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        console.error('No user is currently logged in.');
        return;
      }
  
      // Get user data from Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        console.error('User document does not exist in the database.');
        return;
      }
  
      const userData = userDocSnap.data();
      const username = userData.username;
      const userImage = userData.profileUrl;
  
      if (!username || !userImage) {
        console.error('Username or user image is missing.');
        return;
      }
  
      const hotelDocRef = doc(db, 'hotels', id);
      const newReview = {
        text: userReview,
        username: username,
        userImage: userImage,
      };
  
      await updateDoc(hotelDocRef, {
        reviews: arrayUnion(newReview),
      });
  
      setReviews([...reviews, newReview]);
      setUserReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  
  const handlePressReviews = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
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

  return (
    <View>
      <Header />
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
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
  <Text style={styles.header}>Rating</Text>
  <View style={styles.starContainer}>
    
    <StarRating rating={4} starSize={20} filledColor="#D8A123" emptyColor="#ccc" />
  </View>
              <Text style={styles.header}>Description</Text>
              <Text style={styles.additionalDescription}>{hotelDetails.details.additionalDescription}</Text>
              <Text style={styles.header}>Facilities</Text>
              <View style={styles.facilitiesContainer}>
                {hotelDetails.details.facilities.map((facility, index) => (
                  <Text key={index} style={styles.facilityText}>{facility}</Text>
                ))}
              </View>
             
            </View>
            <TouchableOpacity onPress={handlePressReviews}>
              <Text style={styles.header1}>Reviews</Text>
            </TouchableOpacity>
            <View style={styles.reviewsContainer}>
              {reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
            </View>
            <View style={styles.addReviewContainer}>
              <TextInput
                style={styles.reviewInput}
                placeholder="Add your review"
                placeholderTextColor="gray" 
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
        <TouchableOpacity style={styles.bookstyle} onPress={() => router.push({ pathname: '/Calendar', params: { id:id , price:hotelDetails.price,hotelname :hotelDetails.name,place:hotelDetails.destination } })}>
          <Text style={styles.bookTitle}>Booking</Text>
        </TouchableOpacity>
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
  },
  imageItem: {
    width,
  },
  hotelImage: {
    width: '100%',
    height: SLIDESHOW_HEIGHT,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:20
  },
  additionalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityText: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
    marginBottom: 10,
  },
  reviewsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  addReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '50%',
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
  bookstyle: {
    backgroundColor: '#D8A123',
    alignContent: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 35,
    borderRadius: 20,
    marginLeft: 70,
    marginVertical: 10,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default HotelDetails;
