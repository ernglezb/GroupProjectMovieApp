/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mem.MovieApplication.Dao;

/**
 *
 * @author erngl
 */

import com.mem.MovieApplication.Models.Login;
import com.mem.MovieApplication.Models.User;
import java.util.List;

public interface UserDao {

  int register(User user);

  User validateUser(Login login);
  
  public List<User> getAllUsers();
}
