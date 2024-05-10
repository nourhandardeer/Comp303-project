import React ,{useState,useEffect}from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router';
import { auth, db } from '../firebase/config';
import { collection, getDoc, query, where ,doc} from "firebase/firestore";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document from Firestore
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData.admin );
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, []);
  
  const handleBack = () => {
    
      
    
    if (auth.currentUser) {
      
      if (isAdmin) {
        
        router.replace("admin"); 
      } else {
        
        router.replace("user"); 
      }
    } else {
      
      router.replace("Home"); 
    }
   console.log(isAdmin)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    marginBottom: 20, 
    backgroundColor: '#D8A123',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#D8A123',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10, 
  },
});

export default Header;
