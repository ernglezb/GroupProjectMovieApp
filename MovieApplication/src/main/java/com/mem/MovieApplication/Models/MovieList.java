package com.mem.MovieApplication.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity
@Table(name = "movielists")
@IdClass(MovieListPk.class)
public class MovieList {
    @Id
    @Column(name = "list_id", nullable = false, insertable = false, updatable = false)
    private Integer listId;
    @Id
    @Column(name = "movie_id", nullable = false, insertable = false, updatable = false)
    private Integer movieId;
    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "list_id", referencedColumnName = "list_id", nullable = false, updatable = false, insertable = false)
    private UserList userlistsByListId;
    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", nullable = false, updatable = false, insertable = false)
    @JsonIgnore
    @ToString.Exclude
    private Movie moviesByMovieId;


}
