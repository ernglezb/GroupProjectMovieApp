package com.mem.MovieApplication.Controllers;

import com.mem.MovieApplication.Data.MoviesRepository;
import com.mem.MovieApplication.Responses.GenericResponse;
import com.mem.MovieApplication.Services.MovieService;
import com.mem.MovieApplication.Services.UserListService;
import com.mem.MovieApplication.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@CrossOrigin
@RestController
@RequestMapping(value = "api/v1", produces = {"application/json"})
public class MovieListController {


    private final MovieService movieService;
    private final UserListService userListService;
    private final UserService userService;
    private final MoviesRepository moviesRepository;

    public MovieListController(MovieService movieService, UserListService userListService, UserService userService, MoviesRepository moviesRepository) {
        this.movieService = movieService;
        this.userListService = userListService;
        this.userService = userService;
        this.moviesRepository = moviesRepository;
    }

    @PostMapping("user/{userId}/list/{listId}/movie/{movieId}")
    public ResponseEntity<?> addMovieToPlaylist(@PathVariable Integer userId, @PathVariable Integer listId, @PathVariable Integer movieId) throws IOException, InterruptedException {
        GenericResponse response = new GenericResponse();
        if (!userService.existsByUserId(userId)) {
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }
        if (!userListService.existUserList(userId, listId)) { // User doesn't own a list with the details they provided
            response.setMessage("This list does not exist or your account does not have access.");
            response.setStatus(401);
            return ResponseEntity.status(401).body(response);
        }
        if (movieService.movieInList(movieId, listId)) {
            response.setMessage("Movie already exists in your playlist.");
            response.setStatus(422);
            return ResponseEntity.status(422).body(response);
        }
        try {
            movieService.saveMovieInList(movieId, listId);
            response.setStatus(201);
            response.setMessage("Successfully saved movie to your movie list");

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) { //
            response.setStatus(404);
            response.setMessage("Movie not found.");
            return ResponseEntity.status(404).body(response);
        }

    }

    @GetMapping("user/{userId}/list/{listId}/movie")
    public ResponseEntity<?> getMoviesFromPlaylist(@PathVariable Integer userId, @PathVariable Integer listId) {
        GenericResponse response = new GenericResponse();
        if (!userService.existsByUserId(userId)) {
            response.setMessage("User was not found");
            response.setStatus(404);
            return ResponseEntity.status(404).body(response);
        }
        if (!userListService.existUserList(userId, listId)) { // User doesn't own a list with the details they provided
            response.setMessage("This list does not exist or your account does not have access.");
            response.setStatus(401);
            return ResponseEntity.status(401).body(response);
        }

        return ResponseEntity.status(200).body(movieService.getAllMoviesInList(listId));
    }

    @DeleteMapping("user/{userId}/list/{listId}/movie/{movieId}")
    public ResponseEntity<?> deleteMovieFromPlaylist(@PathVariable Integer userId, @PathVariable Integer listId, @PathVariable Integer movieId) {
        GenericResponse response = new GenericResponse();
        if (movieService.movieInList(movieId, listId) && userListService.existUserList(userId, listId)) {
            movieService.deleteMovieFromList(listId, movieId);
            response.setStatus(200);
            response.setMessage("Successfully Deleted movie from  list");
            return ResponseEntity.status(200).body(response);
        }
        response.setMessage(" This list/movie does not exist or your account does not have access.");
        response.setStatus(401);
        return ResponseEntity.status(401).body(response);
    }
}
