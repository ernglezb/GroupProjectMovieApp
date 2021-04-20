package com.mem.MovieApplication.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "userlists")
@Data
@Valid
public class UserList implements Serializable {
    @OneToMany(mappedBy = "userlistsByListId")
    @ToString.Exclude
    @JsonIgnore
    private List<MovieList> movielistsByListId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, insertable = false, updatable = false)
    private User usersByUserId;

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "list_id", nullable = false)
    private Integer listId;

    @NotNull
    @Column(name = "list_name", nullable = false)
    private String listName;

    @NotNull
    @Column(name = "list_description", nullable = false)
    private String listDescription;

    @Column(name = "user_id", nullable = false)
    private Integer userId;


}
