import { useEffect, useState } from 'react';
import zomato from '../api/zomato';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm, lat, lon) => {
        console.log("galti", searchTerm)
        try {
            // const response = await zomato.get(`/search?entity_id=40&entity_type=city&q=${searchTerm}`);
            const response = await zomato.get(`/search?lat=${lat}&lon=${lon}&q=${searchTerm}`);
            setResults(response.data.restaurants);
            // console.log(response.data);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    }


    // useEffect(() => {
    //     searchApi('pasta')
    // }, [])

    return [searchApi, results, errorMessage];

}