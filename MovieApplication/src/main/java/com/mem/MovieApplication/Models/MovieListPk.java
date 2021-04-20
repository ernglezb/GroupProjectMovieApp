package com.mem.MovieApplication.Models;

import lombok.Data;

import java.io.Serializable;

@Data

// Compound object provided for MovieList, since the table requires a compound key
public class MovieListPk implements Serializable {


    private Integer listId;
    private Integer movieId;


}
