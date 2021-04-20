package com.mem.MovieApplication.Controllers;

import com.mem.MovieApplication.Models.Movie;
import com.mem.MovieApplication.Responses.GenericResponse;
import com.mem.MovieApplication.Services.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(value = "api/v1", produces = {"application/json"})
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<?> getMovie(@PathVariable String movieId) throws IOException, InterruptedException, NumberFormatException {
        GenericResponse response = new GenericResponse();
        try {

            Movie movie = movieService.getMovieById(Integer.parseInt(movieId));
            return ResponseEntity.status(200).body(movie);

        } catch (NumberFormatException e) {
            response.setStatus(422);
            response.setMessage("Non integer characters found in movieId");

            return ResponseEntity.status(422).body(response);
        } catch (Exception e) {

            response.setStatus(404);
            response.setMessage("Movie not found.");
            return ResponseEntity.status(404).body(response);

        }


    }


}
