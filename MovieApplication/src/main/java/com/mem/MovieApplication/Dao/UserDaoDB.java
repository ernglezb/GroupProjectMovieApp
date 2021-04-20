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


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.mem.MovieApplication.Models.Login;
import com.mem.MovieApplication.Models.User;
import org.springframework.stereotype.Repository;




@Repository
public class UserDaoDB implements UserDao {

  @Autowired
  DataSource datasource;

  @Autowired
  JdbcTemplate jdbcTemplate;
  


  @Override
  public List<User> getAllUsers() {
        final String SELECT_ALL_USERS = "Select * From users;"; 
        
        return jdbcTemplate.query(SELECT_ALL_USERS, new UserMapper());
    }

  @Override
  public int register(User user) {
    String sql = "insert into users(user_first_name,user_last_name,user_email,user_password,user_join_date) values(?,?,?,?,CURRENT_TIMESTAMP)";

    return jdbcTemplate.update(sql, new Object[] {  user.getUserPassword(), user.getUserFirstName(),
        user.getUserLastName(), user.getUserEmail() });
  }

  @Override
  public User validateUser(Login login) {
    String sql = "select * from users where user_email='" + login.getUserEmail() + "' and user_password='" + login.getUserPassword()
        + "'";
    List<User> users = jdbcTemplate.query(sql, new UserMapper());

    return users.size() > 0 ? users.get(0) : null;
  }

}

class UserMapper implements RowMapper<User> {

  @Override
  public User mapRow(ResultSet rs, int arg1) throws SQLException {
    User user = new User();

    user.setUserId(rs.getInt("user_id"));
    
    user.setUserPassword(rs.getString("user_password"));
    user.setUserFirstName(rs.getString("user_first_name"));
    user.setUserLastName(rs.getString("user_last_name"));
    user.setUserEmail(rs.getString("user_email"));
    

    return user;
  }
}
