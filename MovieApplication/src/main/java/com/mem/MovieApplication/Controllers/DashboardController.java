package com.mem.MovieApplication.Controllers;

import com.mem.MovieApplication.Responses.DashboardResponse;
import com.mem.MovieApplication.Responses.GenericResponse;
import com.mem.MovieApplication.Services.MovieService;
import com.mem.MovieApplication.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(value = "api/v1", produces = {"application/json"})
public class DashboardController {
    private final UserService userService;
    private final MovieService movieService;


    public DashboardController(UserService userService, MovieService movieService) {
        this.userService = userService;

        this.movieService = movieService;
    }

    @GetMapping("/dashboard/user/{userId}")
    public ResponseEntity<?> getDashboard(@PathVariable Integer userId) throws IOException, InterruptedException {
        DashboardResponse response = new DashboardResponse();
        if (userService.existsByUserId(userId)) {
            response.setRecommendedMovies(movieService.getRecommendedMovies(userId));
            response.setStatus(200);
            response.setRecentlyAddedMovies(movieService.getRecentlyAddedMovies());
            response.setPopularMovies(movieService.getPopularMovies());
            return ResponseEntity.status(200).body(response);
        }
        GenericResponse response2 = new GenericResponse();
        response2.setMessage("User was not found");
        response2.setStatus(404);
        return ResponseEntity.status(404).body(response2);

    }


}
