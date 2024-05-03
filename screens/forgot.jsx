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
import { sendPasswordReset} from "../firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(
        error.message || "An error occurred while sending the password reset email."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <Pressable onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2E2C9", // Beige background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000", // Black text color
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000", // Black text color
  },
  successMessage: {
    color: "#000", // Black text color
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "#007BFF",
    fontSize: 16,
    marginTop: 20,
  },
});

export default ForgotPassword;

