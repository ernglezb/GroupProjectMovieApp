package com.mem.MovieApplication.Controllers;

import com.mem.MovieApplication.Models.UserList;
import com.mem.MovieApplication.Responses.GenericResponse;
import com.mem.MovieApplication.Services.UserListService;
import com.mem.MovieApplication.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1", produces = {"application/json"})
@CrossOrigin
public class UserListsController {

    private final UserListService userListService;
    private final UserService userService;

    @Autowired
    public UserListsController(UserListService userListService, UserService userService) {
        this.userListService = userListService;
        this.userService = userService;

    }

    // Create new UserList
    @PostMapping("user/{userId}/list")
    public ResponseEntity<?> createUserList(@RequestBody UserList userList, @PathVariable int userId, BindingResult bindingResult) {
        GenericResponse response = new GenericResponse();
        if (!userService.existsByUserId(userId)) {
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }

        if (bindingResult.hasErrors()) {  // invalid json/body check
            response.setErrors(bindingResult);
            response.setMessage("Invalid body");
            response.setStatus(422);
            return ResponseEntity.status(422).body(response);
        }
        if (userListService.existUserList(userList.getListName(), userId)) { // check for if list exists
            response.setStatus(422);
            response.setMessage("List name already exists.");
            return ResponseEntity.status(422).body(response);
        } else {
            userList.setUserId(userId);
            response.setUserList(userListService.createNewUserList(userList));
            response.setStatus(201);

            return ResponseEntity.status(201).body(response);
        }
    }

    // get  List<UserLists>  for one matching userId
    @GetMapping("user/{userId}/list")
    public ResponseEntity<?> getUserListById(@PathVariable int userId) {
        GenericResponse response = new GenericResponse();
        if (!userService.existsByUserId(userId)) {
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }
        List<UserList> resultList = userListService.getAllUserListByUserId(userId);
        if (resultList.size() > 0) {
            response.setStatus(200);
            return ResponseEntity.status(200).body(resultList);

        } else {
            response.setMessage("No Lists found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }
    }

    // Edits one UserList for given userId and listID
    @PutMapping("user/{userId}/list/{listId}")
    @ResponseBody
    public ResponseEntity<?> editUserList(@PathVariable int userId, @PathVariable Integer listId,
                                          @RequestBody UserList userList, BindingResult bindingResult) {
        GenericResponse response = new GenericResponse();
        if (bindingResult.hasErrors()) {  // invalid json/body check
            response.setStatus(422);
            response.setErrors(bindingResult);
            return ResponseEntity.status(422).body(response);
        }
        if (!userService.existsByUserId(userId)) { // if the userId given wasn't in database at all
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }
        if (!userListService.existUserList(userId, listId)) { // User doesn't own a list with the details they provided
            response.setMessage("This list does not exist or your account does not have access.");
            response.setStatus(401);
            return ResponseEntity.status(401).body(response);
        }
        if (userListService.existUserList(userId, userList.getListName()) && !userListService.getUserList(userList.getListName()).getListId().equals(listId)) { // User already has another list with same name, so Error

            response.setMessage(" List name already exists");
            response.setStatus(422);
            return ResponseEntity.status(422).body(response);
        } else {
            UserList newUserList = userListService.updateUserList(userId, listId, userList.getListName(), userList.getListDescription());
            response.setMessage(" Successfully edited " + newUserList.getListName());
            response.setStatus(201);
            return ResponseEntity.status(201).body(response);

        }
    }

    @DeleteMapping("user/{userId}/list/{listId}")
    public ResponseEntity<?> deleteUserList(@PathVariable Integer userId, @PathVariable Integer listId) {
        GenericResponse response = new GenericResponse();
        if (userListService.existUserList(userId, listId)) {
            userListService.deleteUserList(userId, listId);
            response.setStatus(200);
            response.setMessage("Successfully deleted list");
            return ResponseEntity.status(200).body(response);
        }

        response.setMessage(" This list does not exist or your account does not have access.");
        response.setStatus(401);
        return ResponseEntity.status(401).body(response);
    }


}

