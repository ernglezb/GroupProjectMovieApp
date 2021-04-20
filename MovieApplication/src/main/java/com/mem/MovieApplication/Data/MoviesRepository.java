package com.mem.MovieApplication.Data;

import com.mem.MovieApplication.Models.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MoviesRepository extends JpaRepository<Movie, Integer>, JpaSpecificationExecutor<Movie> {

    @Query("SELECT  m.moviesByMovieId from MovieList m where m.userlistsByListId.listId = ?1")
    List<Movie> getAllMoviesByListId(Integer listId);


    // 10 movies recently added
    List<Movie> findTop10ByOrderByDateAddedDesc();

    // Most Popular movies
    @Query("SELECT m.moviesByMovieId from MovieList m  group by m.movieId HAVING count(m.moviesByMovieId) >1 order by count(m.moviesByMovieId) desc")
    List<Movie> findMostPopularMovies(Pageable pageable);
}