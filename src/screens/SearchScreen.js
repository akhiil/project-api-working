import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Modal, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import zomato from '../api/zomato'
import { TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
// import Geocoder from 'react-native-geocoding';

//  const myApiKey="AIzaSyDsPW7I3JWKkn1BkCyQZIPWRzr4eysIxs4"
//  Geocoder.init(myApiKey);

const SearchScreen = (props) => {
    const [term, setTerm] = useState('');
    const [manLocation, setManLocation] = useState('set location first');
    const [searchApi, results, errorMessage] = useResults();
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [logo, setLogo] = useState(true);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

const fetchLocation = async() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setLat(location.coords.latitude);
          setLon(location.coords.longitude)
          setTimeout(async() => {
            const response = await zomato.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`);
            setManLocation(response.data.location.title)
            console.log("ye hai",location.coords.latitude, location.coords.longitude);
            console.log("nikhil-kumar", response.data.location.title)
          }, 3000)
        })();

//         const response = await zomato.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`);
// console.log("nikhil", response.data.location.title)
      }

    customLocation = async() => {
        const response = await zomato.get(`locations?query=${manLocation}`);
        setLat(response.data.location_suggestions[0].latitude)
        setLon(response.data.location_suggestions[0].longitude)
    }

   // console.log(lat, lon)



   


    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.restaurant.price_range === price;
        });
    };

    return (
        <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{marginTop:5, fontSize:15}}>{manLocation}</Text>
            <TouchableOpacity
            onPress={() => {
                 setManLocation('')
                setIsVisible(true)}}
            style={{backgroundColor:'lightgray', padding:5, borderRadius:5}}>
  <Text style={{fontSize:17, color:'blue'}}>Enter Location</Text>
  </TouchableOpacity>
</View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => {
                    setLogo(false)
                    searchApi(term, lat, lon)}}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            
                {logo ?
                <View style={{ backgroundColor:'lightgray', paddingVertical:50, marginTop:'20%'}}>
               <Text style={{fontSize:50, fontWeight:'bold', color:'blue', textAlign:'center'}}>Zhiffy</Text>
                </View> :
                <ScrollView>
                <ResultsList results={filterResultsByPrice(2)} title="Low-Price-Resturants" />
                <ResultsList results={filterResultsByPrice(3)} title="medium-Price-Resturants" />
                <ResultsList results={filterResultsByPrice(4)} title="High-Price-Resturants" />
                </ScrollView>}
            

            <View style={{marginHorizontal:10}}>
            <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!isVisible);
          }}
        >
            <View style={{backgroundColor:'lightgray', marginVertical:'30%', padding:20, marginHorizontal:'5%'}}>
            <TextInput placeholder="enter your location"
            value={manLocation}
            onChangeText={(value) => setManLocation(value)}
             style={{backgroundColor:'white', marginHorizontal:20,height:40,borderRadius:8 }}/>
            <TouchableOpacity onPress={fetchLocation} style={{marginTop:20, marginLeft:25}}>
                <Text style={{color:'blue', fontSize:20}}>find your curremnt location ?</Text>
            </TouchableOpacity>
<View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={() => {
                setManLocation('enter your location first')
                setIsVisible(false)}} style={{marginTop:20, marginLeft:25, backgroundColor:'red', padding:5, borderRadius:5}}>
                <Text style={{color:'blue', fontSize:20, color:'white', fontWeight:'bold'}}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if(manLocation) {
                    customLocation();
                    setIsVisible(false);
                }else {
                    alert('please enter location')
                }
            }} style={{marginTop:20, marginLeft:25, backgroundColor:'green', padding:5, borderRadius:5}}>
                <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>ok</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>
            </View>

            
        </>
    )
}

export default SearchScreen;


//AIzaSyB3QZmnzy0rRtETsm3zrlF2TqlTUCUQNj4