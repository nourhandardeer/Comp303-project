import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, where,doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams ,router} from "expo-router";
import { AinSokhnahotelsData} from '../data/AinSokhnaHotelData';
import Header from '../components/header'

export default function Profile(){


return(


    <View>
        <Header/>
        <Text>
            hello
        </Text>
    </View>
)



};