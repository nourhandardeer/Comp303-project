import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { register } from "../firebase/auth";
import { db, auth } from '../firebase/config';
import { doc, setDoc } from "firebase/firestore"; 
import Header from '../components/header';

const backgroundImage = require('../assets/images/bg.jpg');

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [confirm, setConfirm] = useState("");

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
      setError(error);
    }
  };

  const addUser = async () => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username: username,
        email: email,
        password: password,
        profileUrl: profileUrl
      });
      // Navigate to login screen after successful registration
      router.replace("/login");
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Header />
        <View style={styles.overlay}>
          <Text style={styles.registerText}>Sign up</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Profile Image URL"
            value={profileUrl}
            onChangeText={setProfileUrl}
            style={styles.input}
          />
          
          <Pressable onPress={handlePress} style={styles.signupButton}>
            <Text style={styles.signupText}>Register</Text>
          </Pressable>
          
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Baby blue with opacity
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: 300,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontFamily: "Arial",
    fontSize: 16,
  },
  error: {
    color: "black",
    fontSize: 16,
    fontFamily: "Arial",
  },

  signupButton: {
    backgroundColor: '#ADD8E6', // Baby blue color
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
