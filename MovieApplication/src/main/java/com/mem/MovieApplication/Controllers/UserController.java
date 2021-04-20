package com.mem.MovieApplication.Controllers;

import com.mem.MovieApplication.Dao.UserDaoDB;
import com.mem.MovieApplication.Models.Login;
import com.mem.MovieApplication.Models.User;
import com.mem.MovieApplication.Responses.GenericResponse;
import com.mem.MovieApplication.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;


@RestController
@RequestMapping(value = "api/v1", produces = {"application/json"})
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final UserDaoDB dao;

    @Autowired
    public UserController(UserService userService, UserDaoDB dao) {
        this.userService = userService;
        this.dao = dao;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUserAccount(@NotEmpty @Valid @RequestBody User user, BindingResult bindingResult) {
        GenericResponse response = new GenericResponse();
        if (bindingResult.hasErrors()) {
            response.setStatus(422);
            response.setErrors(bindingResult);
            response.setMessage("There was an error creating your account.");
            return ResponseEntity.status(422).body(response);
        }

        if (userService.existsByEmail(user.getUserEmail())) {
            response.setStatus(409);
            response.setMessage("Email Address is already in use");
            return ResponseEntity.status(409).body(response);
        } else {
            userService.registerNewUserAccount(user);
            response.setMessage("Successfully created");
            response.setUserId(user.getUserId());
            response.setStatus(201);
            return ResponseEntity.status(201).body(response);
        }


    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUserAccount(@Valid @RequestBody Login login, BindingResult bindingResult) {
        GenericResponse response = new GenericResponse();

        if (userService.existsByUserEmailUAndUserPassword(login.getUserEmail(), login.getUserPassword())) {
            response.setStatus(200);
            response.setUserId(userService.validateUser(login).getUserId());
            response.setMessage("Successful Login");
            return ResponseEntity.status(200).body(response);
        }

        response.setMessage("Your Email or Password is incorrect");
        response.setStatus(401);
        return ResponseEntity.status(401).body(response);


    }


    @GetMapping("/users")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable Integer userId) {
        GenericResponse response = new GenericResponse();
        if (!userService.existsByUserId(userId)) { // if the userId given wasn't in database at all
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }

        User foundUser = userService.getUserById(userId);
        foundUser.setUserPassword(null);  // set to null so that user password isn't returned
        return ResponseEntity.status(200).body(foundUser);
    }

}
