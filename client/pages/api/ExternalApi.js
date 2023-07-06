import axios from 'axios';

const API_KEY = process.env.API_KEY
// console.log(API_KEY)
const NEWS_API_KEY = `https://newsapi.org/v2/everything?q=technology AND business&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

export const GET_NEWS_API = async () => {
    let response;
    try {
        response = await axios.get(NEWS_API_KEY)
        response = response.data.articles.splice(0, 54)
    } catch (error) {
        return error;
    }
    return response;
};