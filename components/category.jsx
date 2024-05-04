import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import data from '../data/categoryData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import destinationBeach from '../data/beachPlaces';
import destinationCity from '../data/cityPlaces';

const Category = () => {
  const [beachExpanded, setBeachExpanded] = useState(false);
  const [cityExpanded, setCityExpanded] = useState(false);

  const toggleBeach = () => {
    setBeachExpanded(!beachExpanded);
    setCityExpanded(false);
  };

  const toggleCity = () => {
    setCityExpanded(!cityExpanded);
    setBeachExpanded(false);
  };

  const handleDestinationPress = (title) => {
    router.replace(`/${title}`);
  };

  return (
    <View >
      <Text style={styles.title}>  Categories</Text>
      <View style={styles.container}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.title === 'Beach' ? toggleBeach : toggleCity}
            style={styles.categoryButton}
          >
            <MaterialCommunityIcons
              name={item.iconName}
              size={20}
              color={"black"}
            />
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {beachExpanded && (
        <ScrollView horizontal>
          <View style={styles.options}>
            {destinationBeach.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleDestinationPress(destination.title)}
              >
                <Image source={destination.image} style={styles.image} />
                <Text style={styles.optionText}>{destination.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {cityExpanded && (
        <ScrollView horizontal>
          <View style={styles.options}>
            {destinationCity.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleDestinationPress(destination.title)}
              >
                <Image source={destination.image} style={styles.image} />
                <Text style={styles.optionText}>{destination.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: "white",
    marginBottom:10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8A123',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    width: 100,
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  options: {
    marginTop: 10,
    flexDirection: 'row',
  },
  option: {
    marginRight: 10,
    alignItems: 'center',
    padding: 5,
  },
  optionText: {
    marginTop: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
