package com.mem.MovieApplication.Data;

import com.mem.MovieApplication.Models.Movie;
import com.mem.MovieApplication.Models.MovieList;
import com.mem.MovieApplication.Models.MovieListPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieListsRepository extends JpaRepository<MovieList, MovieListPk>, JpaSpecificationExecutor<MovieList> {

    boolean existsMovieListsByListIdAndMovieId(Integer listId, Integer movieId);

    void deleteMovieListByListIdAndMovieId(Integer listId, Integer movieId);

    void deleteAllByListId(Integer listId);

    @Query("Select m.moviesByMovieId from MovieList m where m.userlistsByListId.userId= :userId order by m.moviesByMovieId.dateAdded desc ")
    List<Movie> getAllMoviesByUserId(@Param("userId") Integer userId);

}