package com.mem.MovieApplication.Services;

import com.mem.MovieApplication.Models.Movie;

import java.io.IOException;
import java.util.List;

public interface MovieService {

    Movie getMovieById(Integer id) throws IOException, InterruptedException;

    boolean movieInList(Integer movieId, Integer listId);

    void saveMovieInList(Integer movieId, Integer listId) throws IOException, InterruptedException;

    void deleteMovieFromList(Integer listId, Integer movieId);

    List<Movie> getAllMoviesInList(Integer listId);

    List<Movie> getPopularMovies();

    List<Movie> getRecentlyAddedMovies();

    List<Movie> getRecommendedMovies(Integer userId) throws IOException, InterruptedException;
}
