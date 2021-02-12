import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import zomato from '../api/zomato';
import Header from '../components/header'

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await zomato.get(`/restaurant?res_id=${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <>
      <Header name='Child screen' />
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{ uri: result.thumb }} />
          <Text style={styles.title}>{result.name}</Text>
          <Text style={styles.name}>Average Cost For Two </Text>
          <Text style={styles.childText}>{result.currency} {result.average_cost_for_two}</Text>
          <Text style={styles.name}>Cuisines</Text>
          <Text style={styles.childText}>{result.cuisines}</Text>
          <Text style={styles.name}>Timings</Text>
          <Text style={styles.childText}>{result.timings}</Text>
          <Text style={styles.name}>Address</Text>
          <Text>{result.location.address}</Text>
          <Text style={styles.name}>Highlights -</Text>
          <FlatList
            data={result.highlights}
            keyExtractor={it => it}
            renderItem={({ item }) => {
              return <Text style={styles.childText}>{item}</Text>;
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15
  },
  image: {
    width: 'auto',
    height: 120,
    borderRadius: 4,
    marginVertical: 8
  },
  name: {
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: '#a4bcfc',
    padding: 3,
    width: '50%',
    borderRadius: 8,
    marginTop: 8,
    color: '#0036c7'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 8,
    color: '#c70000',
    textAlign: 'center'
  },
  childText: {
    backgroundColor: 'lightgray',
    padding: 4,
    marginTop: 2,
    borderRadius: 5
  }
});

export default ResultsShowScreen;