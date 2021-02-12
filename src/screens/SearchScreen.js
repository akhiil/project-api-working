import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, TouchableOpacity, Modal, Alert, StyleSheet, Picker } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import zomato from '../api/zomato'
import { TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import Category from '../components/categoryScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Header from '../components/header';
const category = [
    {
        id: '1',
        value: 'Burger',
        icon: <MaterialCommunityIcons name="hamburger" size={24} color="brown" style={{ textAlign: 'center' }} />,
        color: '#8ab559',
        check: false
    },
    {
        id: '2',
        value: 'pizza',
        icon: <FontAwesome5 name="pizza-slice" size={24} color="yellow" style={{ textAlign: 'center' }} />,
        color: '#93d9ae',
        check: false
    },
    {
        id: '3',
        value: 'Cake',
        icon: <FontAwesome5 name="birthday-cake" size={24} color="skyblue" style={{ textAlign: 'center' }} />,
        color: '#d4ae6c',
        check: false
    },
    {
        id: '4',
        value: 'Ice-Cream',
        icon: <FontAwesome5 name="ice-cream" size={24} color="orange" style={{ textAlign: 'center' }} />,
        color: '#e6478c',
        check: false
    },
    {
        id: '5',
        value: 'Briyani',
        icon: <MaterialCommunityIcons name="food-variant" size={24} color="#728a5e" style={{ textAlign: 'center' }} />,
        color: '#f5f095',
        check: false
    },
    {
        id: '6',
        value: 'Tea',
        icon: <MaterialIcons name="free-breakfast" size={24} color="#e5ebb7" style={{ textAlign: 'center' }} />,
        color: '#fa4534',
        check: false
    },
    {
        id: '7',
        value: 'Coffee',
        icon: <Fontisto name="coffeescript" size={24} color="#595637" style={{ textAlign: 'center' }} />,
        color: '#4ad962',
        check: false
    },
    {
        id: '8',
        value: 'Chinese',
        icon: <MaterialCommunityIcons name="food-fork-drink" size={24} color="white" style={{ textAlign: 'center' }} />,
        color: '#218cd9',
        check: false
    },
    {
        id: '9',
        value: 'Veg',
        icon: <MaterialCommunityIcons name="food-apple" size={24} color="#57271a" style={{ textAlign: 'center' }} />,
        color: '#c387d4',
        check: false
    }
];
// import Geocoder from 'react-native-geocoding';

//  const myApiKey="AIzaSyDsPW7I3JWKkn1BkCyQZIPWRzr4eysIxs4"
//  Geocoder.init(myApiKey);

const SearchScreen = (props) => {
    const [term, setTerm] = useState('');
    const [manLocation, setManLocation] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [isVisible, setIsVisible] = useState(true);
    const [logo, setLogo] = useState(true);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [checkLoc, setCheckLoc] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [childData, setChildData] = useState(null);
    const [selectCat, setSelectCat] = useState('')


    // console.log("akhil la ", category[childData].value, term);

    const startSearch = () => {
        // const temp = category.filter((cat) => cat.id === childData)
        if (childData !== null) {
            console.log("hey", category[childData].value)
            setTerm(category[childData].value);

            setTimeout(() => {
                setLogo(false)
                console.log("yha bi", term)
                searchApi(category[childData].value, lat, lon)
            }, 500)
        }
    }


    const fetchLocation = async () => {
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
            // setTimeout(async () => {
            //     const response = await zomato.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`);
            //     setManLocation(response.data.location.title)
            //     console.log("ye hai", location.coords.latitude, location.coords.longitude);
            //     console.log("nikhil-kumar", response.data.location.title)
            // }, 3000)
        })();
        setCheckLoc(true)
        setFetching(true);
        //         const response = await zomato.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`);
        // console.log("nikhil", response.data.location.title)
        setTimeout(() => {
            setFetching(false);
        }, 3000)
    }

    customLocation = async () => {
        if (checkLoc) {
            const response1 = await zomato.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`);
            setManLocation(response1.data.location.title)
        }
        else {
            const response = await zomato.get(`locations?query=${manLocation}`);
            setLat(response.data.location_suggestions[0].latitude)
            setLon(response.data.location_suggestions[0].longitude)
        }
    }

    console.log(lat, lon)

    // if (lat && lon) {
    //     setCheckLoc(false)
    // }


    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.restaurant.price_range === price;
        });
    };

    if (isVisible && fetching) {
        return (
            <Text>Location fetching...</Text>
        )
    }


    if (isVisible) {
        return (
            <View style={{ marginTop: 150 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <Text style={{ marginTop: 5, fontSize: 15 }}>{manLocation}</Text> */}
                    {/* <TouchableOpacity
                        onPress={() => {
                            setManLocation('')
                            setIsVisible(true)
                        }}
                        style={{ backgroundColor: 'lightgray', padding: 5, borderRadius: 5 }}>
                        <Text style={{ fontSize: 17, color: 'blue' }}>Enter Location</Text>
                    </TouchableOpacity> */}
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!isVisible);
                        }}
                    > */}
                    <View style={{ backgroundColor: 'lightgray', marginVertical: '30%', padding: 20, marginHorizontal: '5%', borderWidth: 2, borderRadius: 5 }}>
                        <Entypo name="location" size={24} color="#07a676" style={{ textAlign: 'center', marginBottom: 6 }} />
                        <TextInput placeholder="enter your location"
                            value={manLocation}
                            onChangeText={(value) => setManLocation(value)}
                            style={{ backgroundColor: 'white', marginHorizontal: 20, height: 40, borderRadius: 8, borderWidth: 1, paddingHorizontal: 3 }} />
                        <TouchableOpacity onPress={fetchLocation} style={{ marginTop: 20, marginLeft: 25 }}>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Ionicons name="md-locate" size={24} color="black" style={{ marginRight: 5 }} />
                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>find your current location ?</Text>
                            </View>
                        </TouchableOpacity>
                        {lat && lon ? <Text style={{ marginTop: 5, fontSize: 15 }}>Location fetched</Text> : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* <TouchableOpacity onPress={() => {
                                setManLocation('enter your location first')
                                setIsVisible(false)
                            }} style={{ marginTop: 20, marginLeft: 25, backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
                                <Text style={{ color: 'blue', fontSize: 20, color: 'white', fontWeight: 'bold' }}>cancel</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => {
                                if (manLocation || checkLoc) {
                                    customLocation();
                                    setIsVisible(false);
                                }
                            }} style={{ marginTop: 20, backgroundColor: '#a82020', paddingHorizontal: 30, paddingVertical: 7, borderRadius: 5 }}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </Modal> */}
                </View>

            </View>
        );
    }


    return (
        <>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginTop: 5, fontSize: 15 }}>{manLocation}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setManLocation('')
                        setIsVisible(true)
                    }}
                    style={{ backgroundColor: 'lightgray', padding: 5, borderRadius: 5 }}>
                    <Text style={{ fontSize: 17, color: 'blue' }}>Enter Location</Text>
                </TouchableOpacity>
            </View> */}
            <Header name="Parent Screen" />
            <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 20 }}>
                <Entypo name="location" size={24} color="black" />
                <Text style={{ marginLeft: 20, fontSize: 18 }}>{manLocation}</Text>

            </View>
            <View style={{
                borderStyle: 'dotted',
                borderWidth: 1,
                borderRadius: 1,
                marginHorizontal: 55
            }}>
            </View>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => {
                    setLogo(false)
                    searchApi(term, lat, lon)
                }}
            />
            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 35 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    <View style={styles.filter}><Text style={{ textAlign: 'center', fontSize: 15 }}>filter</Text></View>
                    <View style={styles.filter}><Text style={{ textAlign: 'center', fontSize: 15 }}>Rating: 4.0+</Text></View>
                    <View style={styles.filter}>
                        <Picker
                            selectedValue={term}
                            style={{ height: 25, width: 130 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setTerm(itemValue)
                                setLogo(false)
                                searchApi(itemValue, lat, lon)
                            }}
                        >
                            <Picker.Item label="Category" />
                            <Picker.Item label="Burger" value='burger' />
                            <Picker.Item label="Pizza" value='pizza' />
                            <Picker.Item label="Cake" value='cake' />
                            <Picker.Item label="Ice-Cream" value='ice-cream' />
                            <Picker.Item label="Briyani" value='briyani' />
                            <Picker.Item label="Tea" value='tea' />
                            <Picker.Item label="Coffee" value='coffee' />
                            <Picker.Item label="Chinese" value='chinese' />
                            <Picker.Item label="Veg" value='veg' />
                        </Picker>
                    </View>
                    <View style={styles.filter}><Text style={{ textAlign: 'center', fontSize: 15 }}>Fastest Delivery</Text></View>
                    <View style={styles.filter}><Text style={{ textAlign: 'center', fontSize: 15 }}>rating</Text></View>
                    <View style={styles.filter}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 25, width: 100 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="cost" />
                            <Picker.Item label="Low Cost" value='2' />
                            <Picker.Item label="Medium Cost" value='3' />
                            <Picker.Item label="High Cost" value='4' />
                        </Picker>
                    </View>

                </ScrollView>
            </View>
            { errorMessage ? <Text>{errorMessage}</Text> : null}

            {
                logo ?
                    <View>
                        <View style={{ backgroundColor: '#4356e6', paddingVertical: 20, marginTop: 10, paddingHorizontal: 10, borderRadius: 20, marginHorizontal: 10 }}>
                            <View style={{ borderWidth: 10, borderColor: 'lightgray', borderRadius: 30, padding: 20 }}>
                                <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'lightgray', textAlign: 'center' }}>Zhiffy</Text>
                            </View>
                        </View>
                        <Category onChoose={setChildData} onPress={startSearch} />
                        <Text>{childData}</Text>
                    </View> : <ScrollView>
                        <View style={{ backgroundColor: '#ff1f1f', marginHorizontal: 10, borderRadius: 20, marginTop: 25, paddingVertical: 20 }}>
                            {selectedValue === '2' ? <ResultsList results={filterResultsByPrice(2)} title="Low-Price-Resturants" /> : null}
                            {selectedValue === '3' ? <ResultsList results={filterResultsByPrice(3)} title="medium-Price-Resturants" /> : null}
                            {selectedValue === '4' ? <ResultsList results={filterResultsByPrice(4)} title="High-Price-Resturants" /> : null}
                        </View>
                        <View style={{ backgroundColor: '#4356e6', paddingVertical: 20, marginTop: 30, paddingHorizontal: 10, borderRadius: 20, marginHorizontal: 10 }}>
                            <View style={{ borderWidth: 10, borderColor: 'lightgray', borderRadius: 30, padding: 20 }}>
                                <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'lightgray', textAlign: 'center' }}>Zhiffy</Text>
                            </View>
                        </View>
                    </ScrollView>
            }


        </>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: 'lightgray',
        marginLeft: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 6
    }
})

export default SearchScreen;


//AIzaSyB3QZmnzy0rRtETsm3zrlF2TqlTUCUQNj4