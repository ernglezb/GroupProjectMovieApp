package com.mem.MovieApplication.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "genres")
@Access(AccessType.FIELD)
public class Genre implements Serializable {


    @Id
    @Column(name = "genre_id", nullable = false)
    private Integer genreId;
    @Basic
    @Column(name = "genre_type", nullable = false, length = 20)
    private String genreType;
    @JsonIgnore
    @OneToMany(mappedBy = "genresByGenreId")
    private List<MovieGenre> moviegenresByGenreId;


}
