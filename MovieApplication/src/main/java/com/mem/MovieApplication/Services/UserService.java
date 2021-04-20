package com.mem.MovieApplication.Services;


import com.mem.MovieApplication.Models.Login;
import com.mem.MovieApplication.Models.User;

import java.util.List;

public interface UserService {
    User registerNewUserAccount(User user);

    List<User> getAllUsers();

    public boolean existsByEmail(String email);

    public boolean existsByUserId(Integer userId);

    public boolean existsByUserEmailUAndUserPassword(String email, String password);

    User validateUser(Login login);

    User getUserById(Integer userId);


}
