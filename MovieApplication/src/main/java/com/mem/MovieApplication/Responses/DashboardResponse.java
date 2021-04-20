package com.mem.MovieApplication.Responses;

import com.mem.MovieApplication.Models.Movie;
import lombok.Data;

import java.util.List;

@Data
public class DashboardResponse {

    private Integer status;
    private List<Movie> recentlyAddedMovies;
    private List<Movie> recommendedMovies;
    private List<Movie> popularMovies;


}
