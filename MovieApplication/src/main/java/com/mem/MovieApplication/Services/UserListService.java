package com.mem.MovieApplication.Services;

import com.mem.MovieApplication.Models.UserList;

import java.util.List;

public interface UserListService {

    UserList createNewUserList(UserList userList);

    boolean existUserList(String list_name, int user_id);

    boolean existUserList(Integer userId, Integer listId);

    boolean existUserList(Integer userId, String listName);

    List<UserList> getAllUserListByUserId(Integer user_id);

    void deleteUserList(Integer userId, Integer listId);

    UserList getUserList(Integer userId, Integer listId);

    UserList updateUserList(Integer userId, Integer listId, String newListName, String newUserDescription);

    UserList getUserList(String listName);

}
