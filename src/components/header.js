import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const app = (props) => {
    return (
        <View style={{ backgroundColor: '#c8d8f7', }}>
            <View style={{ backgroundColor: '#dbcccc', height: 40 }} />
            <View style={{ paddingVertical: 12, borderWidth: 5, borderColor: 'red', borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: 'red', fontWeight: 'bold' }}>{props.name}</Text>
            </View>
        </View>
    );
}

export default app;