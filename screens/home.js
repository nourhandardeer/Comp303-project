// App.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EgyptToGo</Text>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.hero}>
        <Text style={styles.heroText}>Welcome </Text>
        <Text></Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 Your App. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  headerButtons: {
    flexDirection: 'row', 
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroText: {
    fontSize: 24,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
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
