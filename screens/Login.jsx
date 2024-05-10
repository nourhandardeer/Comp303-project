import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { login } from "../firebase/auth";
import Header from '../components/header'
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import { auth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/images/bg.jpg');

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log('credentials', credentials);
  
      // Get the current user ID
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        // Set isLoggedIn flag to true in AsyncStorage
        await AsyncStorage.setItem('isLoggedIn', 'true');
        // Navigate to user profile screen after successful login
        router.push({ pathname: '/user', params: { userId: userId } });
      } else {
        // Handle error if user is not logged in
        setError("User is not logged in.");
      }
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error.message); // Set error message instead of error object
    }
  };
  

  return (
    // <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Header />
        <View style={styles.overlay}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={24} color="#D8A123" style={styles.icon} />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={24} color="#D8A123" style={styles.icon} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable onPress={()=>router.replace("/forgot")}>
            <Text style={styles.link}>Forgot Password</Text>
          </Pressable>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: '#D8A123' // Set background color to orange
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with opacity
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: 350, // Increased width
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginText: {
    fontSize: 26,
    color: "#333",
    marginBottom: 30,
    fontFamily: "Futura-CondensedMedium", // Use SF Pro Display font
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "Arial",
    fontSize: 16,
    color: '#333' // Set text color to dark
  },
  link: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Arial",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: "Arial",
  },
  loginButton: {
    backgroundColor: '#D8A123', // Set button background color to orange
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  loginButtonText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 16,
    color: 'black',
  },
});

export default Login;
