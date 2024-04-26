import React, { useState } from "react";
import { View, TextInput, Button, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { register } from "../firebase/auth";
import { db, auth } from '../firebase/Config';
import {  setDoc, doc } from "firebase/firestore"; 

const backgroundImage = require('../assets/images/backgroundImage.jpg');

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
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
        email: email,
        password: password
      });
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      throw error;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.registerText}>Signup</Text>
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
          <Button title="Register" onPress={handlePress} />
          <Pressable onPress={()=>router.replace("/account/login")}>
            <Text style={styles.link}>Login</Text>
          </Pressable>
          <Pressable onPress={()=>router.replace("/account/forgot")}>
            <Text style={styles.link}>Forgot Password</Text>
          </Pressable>
          <Text style={styles.error}>{error.code}</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    fontFamily: "Arial Rounded MT Bold",
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
  link: {
    color: "#007BFF",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Arial",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontFamily: "Arial",
  },
});

export default Register;