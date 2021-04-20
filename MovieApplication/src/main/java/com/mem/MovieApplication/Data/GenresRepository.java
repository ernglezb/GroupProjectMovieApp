package com.mem.MovieApplication.Data;

import com.mem.MovieApplication.Models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GenresRepository extends JpaRepository<Genre, Integer>, JpaSpecificationExecutor<Genre> {

}