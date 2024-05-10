import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

const StarRating = ({ rating, starSize, filledColor, emptyColor }) => {
  const stars = [];

  // Create an array of FontAwesome icons based on the rating
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= rating ? 'star' : 'star-o'}
        size={starSize}
        color={i <= rating ? filledColor : emptyColor}
      />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default StarRating;
