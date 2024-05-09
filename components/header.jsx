import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { router } from 'expo-router';

const Header = () => {
  const handleBack = () => {
    router.replace("Home");
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
