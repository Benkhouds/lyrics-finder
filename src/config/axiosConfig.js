import axios from 'axios';

const instance = axios.create({
 baseURL: `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1`,
});


export default instance; 