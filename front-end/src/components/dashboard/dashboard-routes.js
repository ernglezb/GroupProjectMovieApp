import {baseRoute} from '../../api/api-routes'


export const searchMovie = async (keyWord, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=dc08462c87b0e436eaa9d959fabd2ee1&language=en-US&query=${keyWord}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export const loadDashboard = async (userId) => {
    const url = `${baseRoute}/dashboard/user/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}