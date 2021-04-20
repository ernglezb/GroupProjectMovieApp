/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mem.MovieApplication.Models;

import com.mem.MovieApplication.Models.Validators.ValidEmail;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author erngl
 */


@Valid
public class Login {
    
  @NotNull(message = "Email must not be null")
  @ValidEmail
  
  private String userEmail;
  
  @Size(min = 6, max = 15, message = " Password must be between 5 and 16 ")
  @NotNull(message = "Password must not be null")
  
  private String userPassword;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

  
    
}
