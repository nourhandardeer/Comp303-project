
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, where , doc , setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams ,router} from "expo-router";
import { NorthCoastHotelsData  } from '../data/NorthCoastHotelsData';
import Header from '../components/header';

const NorthCoast = () => {
    const [hotels, setHotels] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const params = useLocalSearchParams();

    // useEffect(() => {
    //     const addHotelsToFirestore = async () => {
    //       try {
    //         const hotelsCollectionRef = collection(db, 'hotels');
    //         for (const hotel of NorthCoastHotelsData ) {
    //           const hotelDocRef = doc(hotelsCollectionRef, hotel.id.toString());
    //           await setDoc(hotelDocRef, hotel); // Set document ID as hotel ID
    //         }
    //         console.log('Hotels added to Firestore successfully!');
    //       } catch (error) {
    //         console.error('Error adding hotels to Firestore:', error);
    //       }
    //     };
    
    //     addHotelsToFirestore(); // Invoke the function when the component mounts
    
    //     // No dependencies are listed, so this will only run once when the component mounts
    // }, []);

    useEffect(() => {
        const fetchHotelsFromFirestore = async () => {
          try {
            const hotelsCollectionRef = collection(db, 'hotels');
            const q = query(hotelsCollectionRef, where('destination', '==', 'NorthCoast'));
            const querySnapshot = await getDocs(q);
            const hotelsData = querySnapshot.docs.map(doc => doc.data());
            setHotels(hotelsData);
          } catch (error) {
            console.error('Error fetching hotels from Firestore:', error);
          }
        };
    
        fetchHotelsFromFirestore();
      }, []);
    
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
              <TouchableOpacity style={styles.bookstyle} onPress={() => router.push({ pathname: '/Calendar', params: { id: item.id , price:item.price,hotelname :item.name,place:item.destination } })}>
            <Text style={styles.bookTitle}>Book Now</Text>
          </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    
      return (
        <View style={[styles.container, styles.darkBackground]}>
          <Header/>
          <FlatList style={{marginTop:30,}}
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
    

export default NorthCoast ;