import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { login } from "../firebase/auth";
import Header from '../components/header'

const backgroundImage = require('../assets/images/sign.jpeg');

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log('credentials', credentials);
     // router.navigate("/home");
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
      <Header/>
        <View style={styles.overlay}>
          <Text style={styles.loginText}>Login</Text>
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
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          {/* <Pressable onPress={() => router.replace("/account/register")}>
            <Text style={styles.link}>Register</Text>
          </Pressable> */}
          <Pressable onPress={()=>router.replace("/forgot")}>
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
    backgroundColor: 'rgba(210, 180, 140, 0.4)',
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
  loginText: {
    fontSize: 26,
    color: "#333",
    marginBottom: 30,
    fontFamily: "Futura-CondensedMedium", // Use SF Pro Display font
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
    backgroundColor: '#D2B48C', // Custom background color (beige)
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  loginButtonText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 16,
  },
});

export default Login;
