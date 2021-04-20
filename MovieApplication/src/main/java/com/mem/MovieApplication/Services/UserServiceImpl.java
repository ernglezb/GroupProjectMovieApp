package com.mem.MovieApplication.Services;


import com.mem.MovieApplication.Dao.UserDao;
import com.mem.MovieApplication.Data.UserRepository;
import com.mem.MovieApplication.Models.Login;
import com.mem.MovieApplication.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    public final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserRepository repository, UserDao userDao) {
        this.userRepository = repository;
        this.userDao=userDao;
    }
    
    
    


    public boolean existsByEmail(String email) {  // Probably going to rewrite this, I dislike the layout
        boolean result = false;
        try {
            result = userRepository.existsByUserEmail(email);
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            return result;
        }
    }

    @Override
    public boolean existsByUserId(Integer userId) {
        if (userRepository.existsById(userId)) {
            return true;
        }
        ;
        return false;
    }


    @Override
    public User registerNewUserAccount(User user) {
        User createdUser = new User();
        try {
            createdUser = userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            return createdUser;
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new LinkedList<>();
        try {
            users = (List<User>) userRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return users;
        }
    }

    @Override
    public User validateUser(Login login) {
        return userDao.validateUser(login);
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public boolean existsByUserEmailUAndUserPassword(String email, String password) {

        return userRepository.existsUsersByUserEmailAndUserPassword(email, password);
    }


}
