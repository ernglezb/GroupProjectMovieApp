package com.mem.MovieApplication.Models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "movie_id")
@Data
@Entity
@Table(name = "moviegenres")
@Access(AccessType.FIELD)
@IdClass(MovieGenrePk.class)
public class MovieGenre {
    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", nullable = false, insertable = false, updatable = false)
    private Movie moviesByMovieId;
    @JsonIgnore
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "genre_id", referencedColumnName = "genre_id", nullable = false, insertable = false, updatable = false)
    private Genre genresByGenreId;
    @JsonProperty(value = "movie_id")
    @Id
    @Column(name = "movie_id", nullable = false, insertable = false, updatable = false)
    private Integer movieId;
    @Id
    @Column(name = "genre_id", nullable = false, insertable = false, updatable = false)
    private Integer genreId;


}
