package com.mem.MovieApplication.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "movies")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Movie implements Serializable {
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "moviesByMovieId")
    private List<MovieGenre> moviegenresByMovieId;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "moviesByMovieId")
    private List<MovieList> movielistsByMovieId;


    @Id
    @Column(name = "movie_id", nullable = false)
    private Integer movieId;

    @Column(name = "movie_name", nullable = false)
    private String movieName;

    @Column(name = "movie_description", nullable = false)
    private String movieDescription;


    @Column(name = "movie_revenue")
    private Integer movieRevenue;

    @Column(name = "movie_image")
    private String movieImage;

    @Column(name = "movie_budget")
    private Integer movieBudget;

    @Column(name = "movie_runtime")
    private Integer movieRuntime;

    @Column(name = "movie_release_date")
    private String movieReleaseDate;

    @Column(name = "movie_rating_average")
    private BigDecimal movieRatingAverage;

    @ToString.Exclude
    @JsonIgnore
    @CreatedDate
    @Column(name = "date_added", nullable = false, updatable = false, insertable = false)
    private Timestamp dateAdded;

}
