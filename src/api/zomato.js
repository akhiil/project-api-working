import axios from 'axios';

export default axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  headers: {
    'user-key': '56c8db0737b22675cd6f532e39b054bf'
  }
});