import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { register } from "../firebase/auth";
import { db, auth } from '../firebase/config';
import { doc, setDoc } from "firebase/firestore"; 
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons
import Header from '../components/header';
import { router } from 'expo-router';

const backgroundImage = require('../assets/images/bg.jpg');

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handlePress = async () => {
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    
    try {
      const credentials = await register(email, password);
      console.log('credentials', credentials);
      addUser();
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error.message); // Set error message instead of error object
    }
  };

  const addUser = async () => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username: username,
        email: email,
        password: password,
        profileUrl: profileUrl,
        firstName: firstName,
        lastName: lastName,
        phone: phone
      });
      // Navigate to login screen after successful registration
      router.replace("/login");
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    // <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <View style={styles.overlay}>
          <Text style={styles.registerText}>Sign up</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="gray" 
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="gray" 
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="gray" 
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray" 
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray" 
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="gray" 
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="phone" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="gray" 
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
          </View>
         
          <View style={styles.inputContainer}>
            <AntDesign name="link" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="Profile Image URL"
              placeholderTextColor="gray" 
              value={profileUrl}
              onChangeText={setProfileUrl}
              style={styles.input}
            />
          </View>
          
          <Pressable onPress={handlePress} style={styles.signupButton}>
            <Text style={styles.signupText}>Register</Text>
          </Pressable>
          
          <Text style={styles.error}>{error}</Text>
        </View>
      </ScrollView>
    /* </ImageBackground> */
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'white', // Baby blue with opacity
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
  registerText: {
    fontSize: 26,
    color: "#333",
    marginBottom: 30,
    fontFamily: "Futura-CondensedMedium", // Use Helvetica Neue font
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
  },
  error: {
    color: "black",
    fontSize: 16,
    fontFamily: "Arial",
  },

  signupButton: {
    backgroundColor: '#D8A123', // Baby blue color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  signupText: {
    fontWeight: 'bold', // Make the text bold
    fontSize:16,
    color: 'black',
  },
});

export default Register;
