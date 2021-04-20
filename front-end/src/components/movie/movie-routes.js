import {baseRoute} from '../../api/api-routes';

export const fetchMovieById = async movieId => {
    const url = `${baseRoute}/movie/${movieId}`;
    const response = await fetch(url);
    const data = await response.json();
    data.movieImage = data.movieImage.includes("/t/p/original") ? data.movieImage:  `https://www.themoviedb.org/t/p/original${data.movieImage}`;
    return data;
}

export const fetchMovieVideosByMovieId = async movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=dc08462c87b0e436eaa9d959fabd2ee1&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const fetchSimilarMoviesByMovieId = async movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=dc08462c87b0e436eaa9d959fabd2ee1&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    
    const movies = data.results.map((result) => {
        return {
          movieName: result.title,
          movieDescription: result.overview,
          movieBudget: 0,
          movieId: result.id,
          movieImage: `https://www.themoviedb.org/t/p/original/${result.poster_path}`,
          movieRatingAverage: result.vote_average,
          movieReleaseDate: result.release_date,
          movieRevenue: 0
        };
    })

    return movies;
}