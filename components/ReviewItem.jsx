// ReviewItem.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <Image source={{ uri: review.userImage }} style={styles.userImage} />
      <View style={styles.reviewTextContainer}>
        <Text style={styles.reviewUsername}>{review.username}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReviewItem;
