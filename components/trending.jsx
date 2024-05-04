import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import data from '../data/trendingData';
import { list } from 'firebase/storage';

const Trending = () => {
  const handleDestinationPress = (title) => {
    router.replace(`/${title}`);
  };

  const renderDestination = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleDestinationPress(item.title)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.trendingTitle}>TRENDING DESTINATIONS</Text>
      <FlatList style={styles.list}
        data={data}
        renderItem={renderDestination}
        keyExtractor={(item) => item.title}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.options}
      />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  option: {
    width: '48%', 
    marginBottom: 20,
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#D8A123',
  },
  optionText: {
    marginTop: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 150, 
    borderRadius: 10,
  },
  trendingTitle: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  list:{
    marginLeft:30,
  }
});
