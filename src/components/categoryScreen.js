import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import category from '../screens/startScreen';

const App = (props) => {
    return (
        <View style={{ padding: 10 }}>

            <View style={{
                backgroundColor: 'lightgray',
                width: 150,
                marginLeft: '25%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10, padding: 5, marginTop: 20
            }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#ff0000', fontWeight: 'bold' }}>cateogries</Text>
            </View>
            <FlatList
                data={category}
                keyExtractor={(item) => item.id}
                numColumns={3}
                style={{ width: '100%', backgroundColor: '#d3ede6', padding: 10, borderRadius: 10, borderWidth: 3, borderColor: 'lightgray' }}
                contentContainerStyle={{ width: '100%' }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                props.onChoose(index);
                                props.onPress();
                            }}
                            style={{
                                backgroundColor: item.color,
                                marginHorizontal: 15,
                                width: 76,
                                flexDirection: 'column',
                                marginVertical: 10,
                                padding: 5,
                                borderRadius: 10
                            }}>
                            <View>{item.icon}</View>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#565953' }}>{item.value}</Text>
                        </TouchableOpacity>
                    );
                }} />

        </View>
    );
}

export default App;