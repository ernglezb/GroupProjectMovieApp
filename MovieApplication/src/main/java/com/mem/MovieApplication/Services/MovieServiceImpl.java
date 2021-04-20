package com.mem.MovieApplication.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mem.MovieApplication.Data.MovieGenresRepository;
import com.mem.MovieApplication.Data.MovieListsRepository;
import com.mem.MovieApplication.Data.MoviesRepository;
import com.mem.MovieApplication.Models.Movie;
import com.mem.MovieApplication.Models.MovieGenre;
import com.mem.MovieApplication.Models.MovieList;
import com.mem.MovieApplication.Models.MovieListPk;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    private final MoviesRepository moviesRepository;
    HttpClient client = HttpClient.newHttpClient();
    private final MovieGenresRepository moviegenresRepository;
    private final MovieListsRepository movieListsRepository;

    @Autowired
    public MovieServiceImpl(MoviesRepository moviesRepository, MovieGenresRepository moviegenresRepository, MovieListsRepository movieListsRepository) {
        this.moviesRepository = moviesRepository;
        this.moviegenresRepository = moviegenresRepository;
        this.movieListsRepository = movieListsRepository;
    }

    @Override
    public Movie getMovieById(Integer id) throws IOException, InterruptedException {

        if (moviesRepository.existsById(id)) {
            return moviesRepository.findById(id).get();
        } else {
            HttpClient client = HttpClient.newHttpClient();
            String x = String.format("https://api.themoviedb.org/3/movie/%d?api_key=%s&language=en-US", id, System.getenv("API_KEY"));
            String.format("https://api.themoviedb.org/3/movie/%d/recommendations?api_key=%s&language=en-US&page=1", id, System.getenv("API_KEY"));
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(x))
                    .build();
            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(response.body());
            return parseMovieResponse(node);
        }
    }

    @Override
    public void saveMovieInList(Integer movieId, Integer listId) throws IOException, InterruptedException {
        if (!moviesRepository.existsById(movieId)) {
            getMovieById(movieId);
        }

        MovieListPk moviepk = new MovieListPk();
        moviepk.setMovieId(movieId);
        moviepk.setListId(listId);
        MovieList newMovieList = new MovieList();
        newMovieList.setMovieId(movieId);
        newMovieList.setListId(listId);

        movieListsRepository.save(newMovieList);

    }

    @Transactional
    @Override
    public void deleteMovieFromList(Integer listId, Integer movieId) {
        movieListsRepository.deleteMovieListByListIdAndMovieId(listId, movieId);
    }

    @Override
    public List<Movie> getAllMoviesInList(Integer listId) {
        return moviesRepository.getAllMoviesByListId(listId);

    }

    @Override
    public boolean movieInList(Integer movieId, Integer listId) { // check to see if movie already in list
        return movieListsRepository.existsMovieListsByListIdAndMovieId(listId, movieId);

    }


    private Movie parseMovieResponse(JsonNode node) throws IOException, InterruptedException {

        Movie newMovie = new Movie();
        newMovie.setMovieName(node.get("title").asText());
        newMovie.setMovieBudget(node.get("budget").asInt());
        newMovie.setMovieDescription(node.get("overview").asText());
        newMovie.setMovieRevenue(node.get("revenue").asInt());
        newMovie.setMovieReleaseDate((node.get("release_date").asText()));
        newMovie.setMovieRatingAverage((node.get("vote_average").decimalValue()));
        newMovie.setMovieImage(node.get("poster_path").asText());
        newMovie.setMovieId(node.get("id").asInt());
        newMovie.setMovieImage((node.get("poster_path").asText()));
        newMovie.setMovieRuntime(node.get("runtime").asInt());
        moviesRepository.save(newMovie);

        for (JsonNode genre : node.get("genres")) { // since a movie can have multiple genre's this loops through them for each genre

            MovieGenre movieGenre = new MovieGenre();
            movieGenre.setMovieId(node.get("id").asInt());
            movieGenre.setGenreId(genre.get("id").asInt());
            moviegenresRepository.save(movieGenre);
        }
        return newMovie;
    }

    @Override
    public List<Movie> getRecentlyAddedMovies() {
        return moviesRepository.findTop10ByOrderByDateAddedDesc();
    }

    @Override
    public List<Movie> getPopularMovies() {
        return moviesRepository.findMostPopularMovies(PageRequest.of(0, 5));
    }

    @Override
    public List<Movie> getRecommendedMovies(Integer userId) throws IOException, InterruptedException {
        Movie movie = movieListsRepository.getAllMoviesByUserId(userId).size() > 0 ? movieListsRepository.getAllMoviesByUserId(userId).get(0) : null;

        if(movie == null)
            return new ArrayList<Movie>();

        Integer movieId = movie.getMovieId();
        HttpClient client = HttpClient.newHttpClient();
        String x = String.format("https://api.themoviedb.org/3/movie/%d/recommendations?api_key=%s&language=en-US&page=1", movieId, System.getenv("API_KEY"));
        ArrayList<Movie> recommendedList = new ArrayList<Movie>();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(x))
                .build();
        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(response.body());
        for (JsonNode nodeMovie : node.get("results")) {

            Movie newMovie = getMovieById(nodeMovie.get("id").asInt());
            recommendedList.add(newMovie);
        }
        return recommendedList;


    }


}
