package com.mem.MovieApplication.Data;

import com.mem.MovieApplication.Models.UserList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface UserListsRepository extends JpaRepository<UserList, Integer>, JpaSpecificationExecutor<UserList> {

    boolean existsUserListByListNameAndUserId(String list_name, Integer user_id);

    boolean existsUserListByUserIdAndListId(Integer user_id, Integer list_id);

    boolean existsUserListByUserIdAndListName(Integer user_id, String list_name);

    List<UserList> findAllByUserId(Integer user_id);

    UserList findUserListByUserIdAndListId(Integer user_id, Integer list_id);

    UserList findOneByUserIdAndListId(Integer user_id, Integer list_id);

    UserList getUserListByListName(String list_name);

}