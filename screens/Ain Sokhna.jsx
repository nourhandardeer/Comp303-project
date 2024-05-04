import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams ,router} from "expo-router";
import Header from '../components/header'

const AinSokhna = () => {



    return(


        <View>

            <Text>
                hello Ain Sokhna
            </Text>
        </View>
    )
}

export default AinSokhna;