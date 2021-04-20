package com.mem.MovieApplication.Data;

import com.mem.MovieApplication.Models.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MovieGenresRepository extends JpaRepository<MovieGenre, Integer>, JpaSpecificationExecutor<MovieGenre> {

}