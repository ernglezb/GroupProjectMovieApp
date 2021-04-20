package com.mem.MovieApplication.Responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mem.MovieApplication.Models.UserList;
import lombok.Data;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

/*
Generic Response for the API to return for requests. Saves time/code on having to format things before sending

If I have time i'll abstract it to a interface and write
different implementations for ErrorResponse, LoginResponse, MovieResponse, etc
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericResponse { // Generic response to give from API,

    private String message;

    private Integer userId;

    @JsonProperty("jwt-token")
    private String jwttoken;
    private Integer status;

    @JsonProperty("list")
    private UserList userList;

    private Map<String, String> errors;

    public GenericResponse(){}

    public GenericResponse(String message, Integer userId, Integer status) {
        this.message = message;
        this.userId = userId;
        this.status = status;
    }


    public void setErrors(BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<String, String>();
        bindingResult.getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), error.getDefaultMessage());
        });
        this.errors = errorMap;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getJwttoken() {
        return jwttoken;
    }

    public void setJwttoken(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public UserList getUserList() {
        return userList;
    }

    public void setUserList(UserList userList) {
        this.userList = userList;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
