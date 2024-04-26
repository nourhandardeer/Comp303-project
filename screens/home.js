// App.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground ,Pressable } from 'react-native';
import { router } from 'expo-router';
import mainImage from '../assets/images/main.jpg'

export default function App() {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/main.jpg')} style={styles.background} >

      <View style={styles.header}>
        <Text style={styles.headerText}>EgyptToGo</Text>
        
        <View style={styles.headerButtons}>
        <Pressable style={styles.button} onPress={() => router.replace("/account/login")}>
            <Text style={styles.buttonText}>SignIn</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.replace("/account/register")} >
            <Text style={styles.buttonText}>SignUp</Text>
          </Pressable>

        </View>
      </View>
      
      <View style={styles.top}>
        <Text style={styles.qouteText}> Prepare to be enchanted by the wonders of this timeless land,</Text>
        <Text style={styles.qouteText}> where every corner holds a story waiting to be discovered</Text>

      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 Your App. All rights reserved.</Text>
      </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
  header: {
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    
  },
  headerText: {
    color: '#D67808',
    fontSize: 35,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row', 
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  qouteText: {
    fontSize: 40,
    marginBottom: 10,
    color:'#FEFEFE',
    fontFamily:'Futura-CondensedMedium',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#385D6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    color: '#fff',
  },
});
