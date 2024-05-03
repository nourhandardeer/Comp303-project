import React , { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground ,Pressable } from 'react-native';
import { router } from 'expo-router';
import * as Font from 'expo-font';
import Category from '../components/category';


export default function App() {
  
  return (
    <View style={styles.container}>
        <ImageBackground source={{uri: 'https://i.pinimg.com/564x/c4/5e/be/c45ebe25e9dcaffb25321ef98960c5e2.jpg'}} style={styles.background} >

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
      
      
      <View style={styles.top}>
        <Text style={styles.qouteText}> Prepare to be enchanted by the wonders of this timeless land,</Text>
        <Text style={styles.qouteText}> where every corner holds a story waiting to be discovered</Text>
        
      </View>
      <Category></Category>
      
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
    fontSize: 30,
    marginBottom: 10,
    color:'#FEFEFE',
    fontFamily:'Futura-CondensedMedium',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'bold',
    fontStyle:'italic',
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