package com.mem.MovieApplication.Data;


import com.mem.MovieApplication.Models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query("SELECT m from users m INNER JOIN m.userlistsByUserId h ON m.userId = h.userId ")
    List<User> getAllMoviesByListId();

    User findUserByUserEmail(String email);

    boolean existsByUserEmail(String Email);

    User findUserByUserId(Integer userId);

    boolean existsUsersByUserEmailAndUserPassword(String email, String password);


}