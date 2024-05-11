import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminActions = ({ hotelId, name, description, price, onUpdate, onDelete }) => {
  // State variables for the updated name, description, and price
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const handleUpdate = async () => {
    try {
      // Update hotel document in Firestore
      await updateDoc(doc(db, 'hotels', hotelId.toString()), {
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
      });
      // Call parent onUpdate function with updated data
      onUpdate(hotelId.toString(), { name: updatedName, description: updatedDescription, price: updatedPrice });
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  // Function to handle delete
  const handleDelete = async () => {
    try {
      // Delete hotel document from Firestore
      await deleteDoc(doc(db, 'hotels', hotelId.toString()));
      // Call parent onDelete function
      onDelete(hotelId.toString());
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Text inputs for updating hotel details */}
      <TextInput
        style={styles.input}
        value={updatedName}
        onChangeText={setUpdatedName}
        placeholder="Name"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]} // Add additional style for description input
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        placeholder="Description"
        multiline // Allow multiline input
        numberOfLines={4} // Set the number of lines to display
      />
      <TextInput
        style={styles.input}
        value={updatedPrice}
        onChangeText={setUpdatedPrice}
        placeholder="Price"
        keyboardType="numeric" // Set keyboard type to numeric
      />
      
      {/* Update and delete buttons */}
      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10, // Add margin bottom to separate inputs
  },
  descriptionInput: {
    height: 100, // Set a fixed height for description input
  },
  button: {
    backgroundColor: '#D8A123',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347', // Red color for delete button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminActions;
