import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log('credentials', credentials);
      router.navigate("/home");
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
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
        <Button title="Login" onPress={handleLogin} />
        <Pressable onPress={() => router.replace("/account/register")}>
          <Text style={styles.link}>Register</Text>
        </Pressable>
        <Pressable onPress={()=>router.replace("/account/forgot")}>
          <Text style={styles.link}>Forgot Password</Text>
        </Pressable>
        <Text style={styles.error}>{error.code}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfe6e9", // Subtle gradient background color
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width : 300,
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

export default Login;