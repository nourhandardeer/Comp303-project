import React , { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground ,Pressable,ScrollView } from 'react-native';
import { router } from 'expo-router';
import Category from '../components/category';
import Trending from '../components/trending';


const mainBackground = require('../assets/images/main.jpg');

export default function App() {
  
  return (
    <View style={styles.container}>
        <ImageBackground source={mainBackground} style={styles.background} >

      <View style={styles.header}>
        <Text style={styles.headerText}>EgyptToGo</Text>
        
        <View style={styles.headerButtons}>
        <Pressable style={styles.button} onPress={() => router.replace("/login")}>
            <Text style={styles.buttonText}>SignIn</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.replace("/register")} >
            <Text style={styles.buttonText}>SignUp</Text>
          </Pressable>
          

        </View>
      </View>
      <ScrollView>
      
      
      <View style={styles.top}>
        <Pressable style={styles.button} onPress={() => router.replace("/Profile")} >
            <Text style={styles.buttonText}>Profile</Text>
          </Pressable>
        <Text style={styles.qouteText}> Prepare to be enchanted by the wonders of this timeless land,</Text>
        <Text style={styles.qouteText}> where every corner holds a story waiting to be discovered</Text>
        
      </View>
      <Category></Category>
      
      <Trending/>
      </ScrollView>
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
    backgroundColor: 'rgba(300, 120, 0, 0.3)',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    
    
  },
  headerText: {
    color: '#F4C14C',
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
    marginBottom:35,
    marginTop:35,
  },
  qouteText: {
    fontSize: 40,
    marginBottom: 10,
    color:'white',
    fontFamily:'Futura-CondensedMedium',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'bold',
    fontStyle:'italic',
  },
  button: {
    backgroundColor: '#D8A123',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
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