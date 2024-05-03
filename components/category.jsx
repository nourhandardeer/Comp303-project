import React  from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import data from '../data/categoryData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const category = () =>{
return(
    <View>
        
        <Text style={styles.title}>  Categories</Text>
        <View style={styles.continear}>
        {data.map((item,index)=>(
            <TouchableOpacity onPress={()=>{}} style={styles.categoryButton}>
                <MaterialCommunityIcons
                name={item.iconName}
                size={20}
                color={"black"}
                />

                <Text>{item.title}</Text>

            </TouchableOpacity>
        ))}
        </View>
    </View>
)
}

export default category
const styles = StyleSheet.create({
    title:{
        fontSize:25,
        fontWeight:'700',
        color: "black",
    },
    categoryButton:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'#D8A123',
        paddingHorizontal: 16 ,
        paddingVertical: 10,
        borderRadius: 10,
        width:100,
        marginLeft:5,
    },
    continear:{
        flexDirection:'row',
        marginBottom:200,
    }
})