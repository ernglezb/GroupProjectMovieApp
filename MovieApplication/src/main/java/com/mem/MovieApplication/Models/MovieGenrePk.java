package com.mem.MovieApplication.Models;

import lombok.Data;

import java.io.Serializable;

@Data

// Compound object provided for MovieGenre, since the table requires a compound key
public class MovieGenrePk implements Serializable {


    private Integer movieId;
    private Integer genreId;


}
