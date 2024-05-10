import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router';
import { auth } from '../firebase/config'; // Assuming you have Firebase auth imported

const Header = () => {
  
  const handleBack = () => {
    // Check if the user is logged in
    if (auth.currentUser) {
      // User is logged in, navigate to "user" route
      router.replace("user");
    } else {
      // User is not logged in, navigate to "Home" route
      router.replace("Home");
    }
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
