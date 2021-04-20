package com.mem.MovieApplication.Services;

import com.mem.MovieApplication.Data.MovieListsRepository;
import com.mem.MovieApplication.Data.UserListsRepository;
import com.mem.MovieApplication.Models.UserList;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserListServiceImpl implements UserListService {

    private final MovieListsRepository movieListsRepository;
    private final UserListsRepository userListsRepository;

    public UserListServiceImpl(MovieListsRepository movieListsRepository, UserListsRepository userListsRepository) {
        this.movieListsRepository = movieListsRepository;
        this.userListsRepository = userListsRepository;
    }

    @Override
    public UserList createNewUserList(UserList userList) {
        userListsRepository.save(userList);
        return userList;
    }


    @Override
    public boolean existUserList(String list_name, int user_id) {
        return userListsRepository.existsUserListByListNameAndUserId(list_name, user_id);
    }

    @Override
    public boolean existUserList(Integer userId, Integer listId) {
        return userListsRepository.existsUserListByUserIdAndListId(userId, listId);
    }

    public boolean existUserList(Integer userId, String listName) {
        return userListsRepository.existsUserListByUserIdAndListName(userId, listName);
    }


    @Override
    public List<UserList> getAllUserListByUserId(Integer user_id) {
        return userListsRepository.findAllByUserId(user_id);

    }

    @Override
    public UserList getUserList(Integer userId, Integer listId) {

        return userListsRepository.findUserListByUserIdAndListId(userId, listId);
    }

    @Override
    public UserList getUserList(String listName) {
        return userListsRepository.getUserListByListName(listName);
    }

    // Updates a userList with new name and description
    @Override
    public UserList updateUserList(Integer userId, Integer listId, String newListName, String newUserDescription) {
        UserList userListToUpdate = userListsRepository.findOneByUserIdAndListId(userId, listId);
        userListToUpdate.setListName(newListName);
        userListToUpdate.setListDescription(newUserDescription);
        userListsRepository.save(userListToUpdate);
        return userListToUpdate;
    }

    @Transactional
    @Override
    public void deleteUserList(Integer userId, Integer listId) {
        UserList userList = getUserList(userId, listId);

        movieListsRepository.deleteAllByListId(listId);
        userListsRepository.delete(userList);
    }
}
