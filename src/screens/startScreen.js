import React from 'react'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
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

export default category