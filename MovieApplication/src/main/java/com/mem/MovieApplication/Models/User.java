/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mem.MovieApplication.Models;

/**
 * @author erngl
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mem.MovieApplication.Models.Validators.ValidEmail;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Entity(name = "users")
@Valid
@Table(name = "users")
public class User {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private Integer userId;

  @NotEmpty
  @NotNull(message = "LastName can not be null")
  @Column(name = "user_last_name", nullable = false)
  private String userLastName;

  @NotEmpty
  @NotNull(message = "Email must not be null")
  @ValidEmail
  @Column(name = "user_email", nullable = false)
  private String userEmail;

  @NotEmpty
  @Size(min = 6, max = 15, message = " Password must be between 6 and 15 characters ")
  @NotNull(message = "Password must not be null")
  @Column(name = "user_password", nullable = false)
  private String userPassword;


  @Column(name = "user_join_date", nullable = false, updatable = false, insertable = false)
  @CreatedDate
  private Timestamp userJoinDate;

  @NotEmpty
  @NotNull(message = "FirstName can not be null")
  @Column(name = "user_first_name")
  private String userFirstName;
  @OneToMany(mappedBy = "usersByUserId")
  @JsonIgnore
  private List<UserList> userlistsByUserId;

  public User(String userFirstName, String userLastName, String userPassword, String userEmail) {
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userPassword = userPassword;
    this.userEmail = userEmail;

  }

  public User() {

  }

  @JsonProperty("userFirstName")
  public void setUserFirstName(String firstName) {
    this.userFirstName = firstName;
  }


  public String getUserFirstName() {
    return userFirstName;
  }

  public String getUserLastName() {
    return userLastName;
  }

  @JsonProperty("userLastName")
  public void setUserLastName(String userLastName) {
    this.userLastName = userLastName;
  }


  public String getUserPassword() {
    return userPassword;
  }


  @JsonProperty("userPassword")
  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }


  public String getUserEmail() {
    return userEmail;
  }

  @JsonProperty("userEmail")
  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }


  public Integer getUserId() {
    return userId;
  }


}
