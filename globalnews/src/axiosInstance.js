import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://global-news-test-default-rtdb.europe-west1.firebasedatabase.app/'
    }
);
export default instance;