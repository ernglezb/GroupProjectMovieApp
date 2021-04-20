# Software Engineering Group Project



## Team Members

- Ernesto Gonzalez
- Alex Rudchenko

## Mission Statement

- A small group bringing an all in one movie platform for movie geeks

## Project Description
- Users of our application will be allowed to search for movies, create playlists, and get custom movie recommendations based on their interests

---

## Planning

### Database

Type of Database: MySQL

Tables
 - Users
 - Lists
 - MovieLists
 - Movies

Note
- A User can have many Lists
- A-List can have many Movies
- A Movie can be a part of many Lists

---

## API Endpoints

BASE ROUTE: ```http://localhost:8080/api/v1 ```

## Users

### Get User

``` /user/:user_id ```

Method: **GET**


Status: **200**

Response:
```
{ 
   "user": {
      "userId": 1,
      "userFirstName": "Michael",
      "userLastName": "Teixeira",
   }
   "status": 200
}
```

Invalid User Id

Status: **404**

Response 

```
{
  "message": "User id 2 was not found.",
  "status": 404
}
```



## User Movie Lists

### Add Movie to Movie List

```/user/:user_id/list/:list_id/:movie_id ```

Method: **POST**

Status: **200**

1) Upon triggering the api, it checks if the DB contains the movie
    1) If it does not, grab the movie details from TMDB
        1) Save the movie
        2) Save the movie in the user list
    2) If it does, save the movie in the user list

Response
```
{
    status: 200,
    movieId: 1,
    message: "Successfully added movie to your list"
}
```

### Get User Movie Lists

```/user/:user_id/list```

Method: **GET**

Status: **200**

Response

```
{
"status": 200,
"lists": [
      {
        "listId": 2,
        "listName": "Action Movies",
        "listDescription": "All of my favorite action movies",
        "userId": 1
      },
      {
        "listId": 3,
        "listName": "Thriller Movies",
        "listDescription": "All of my favorite thriller movies",
        "userId": 1
      },
    ] 
}

```

Invalid User Id

Status: **404**

Response 

```
{
  "message": "User was not found.",
  "status": 404
}
```
---

### Edit User Movie List

```/user/:user_id/list/:list_id```

Method: **PUT**

Status: **200**

Request

```
{
  "listName": "This is my new list name",
  "listDescription": "Edited my list description"
}

```


Response

```
{
  "status": 200,
  "message": "Successfully edited {listName}"
}

```

**User Access Unauthorized**

**Occurs when the userId does not match the logged in user**

Status: **401**

Response 

```
{
  "message": "User id {id} is not authorized for this request.",
  "status": 401
}
```

**Movie List Access Unauthorized**

**Occurs when the listId does not match the list on the client**

Status: **401**

Response 

```
{
  "message": "Unable to perform actions on list id {id}.",
  "status": 401
}
```

**User Not Found**

Status: **404**

Response 

```
{
  "message": "User was not found.",
  "status": 404
}
```

**Movie List Not Found**

Status: **404**

Response 

```
{
  "message": "Movie List was not found.",
  "status": 404
}
```








---

### Delete User Movie List

```/user/:user_id/list/:list_id```

Method: **DELETE**

Status: **200**

Response

```
{
  "status": 200,
  "message": "Successfully deleted {listName}"
}

```

**User Access Unauthorized**

**Occurs when the userId does not match the logged in user**

Status: **401**

Response 

```
{
  "message": "User id 2 is not authorized for this request",
  "status": 401
}
```

**Movie List Access Unauthorized**

**Occurs when the listId does not match the list on the client**

Status: **401**

Response 

```
{
  "message": "Unable to perform actions on movie list id 2",
  "status": 401
}
```

**User Not Found**

Status: **404**

Response 

```
{
  "message": "User was not found.",
  "status": 404
}
```

**Movie list Not Found**

Status: **404**

Response 

```
{
  "message": "Movie list was not found.",
  "status": 404
}
```

---


### Dashboard

``` /dashboard/user/:user_id ```


Method: **GET**

Status: **200**

Response

```
{

  "status": 200,
  "user":{
        "userId": 1,
        "userFirstName": "Mike",
        "userLastName": "Teixeira",
        "userList": [{
            "userList": 1,
            "userListName": "My Drama",
            "userListDescription": "This is a list containing all of my drama movies"
        },{
          "userList": 2,
          "userListName": "My Action List",
          "userListDescription": "This is a list containing all of my action movies"
        }]
    },
   "recentlyAddedMovies": [
      {
        "movieId": 544,
        "movieName": "Back to the Future",
        "movieDescription": "Marty and Doc go back in time",
        "movieUrl": "8913ubg891fe235.jpg",
        "movieRevenue": "83,231,321",
        "movieBudget":  "10,000,000",
        "movieGenre":   "Action"
      },
      {
        "movieId": 1,
        "movieName": "Wonder Woman 1984",
        "movieDescription": "Diana Prince lives quietly among mortals",
        "movieUrl": "8fb921497b9q.jpg",
        "movieRevenue": "172,432,234",
        "movieBudget":  "200,000,000",
        "movieGenre":   "Action"
      }
    ],
    "recommendedMovies": [
       {
        "movieId": 1,
        "movieName": "Wonder Woman 1984",
        "movieDescription": "Diana Prince lives quietly among mortals",
        "movieUrl": "8fb921497b9q.jpg",
        "movieRevenue": "172,432,234",
        "movieBudget":  "200,000,000",
        "movieGenre":   "Action"
      }
    ]

}
```


**User Not Found**

```
{
   "status": 404,
   "message": "User not found".
}

```




### Search Movies By Keyword


**API TMDB:**
```https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1```


Method: **GET**

Status: **200**


Response (API TMDB)

```
{
"adult": false,
"backdrop_path": "/6XX4Sp9bF0SulXnMnYqQ9lcjLbp.jpg",
"genre_ids": [
          16,
          28,
          14
         ],
"id": 537055,
"original_language": "en",
"original_title": "Wonder Woman: Bloodlines",
"overview": "When Amazon princess Diana of Themsycira chooses to save fighter",
"popularity": 28.972,
"poster_path": "/w1SBqj0fn1j72ST5i1jauWo3swT.jpg",
"release_date": "2019-10-04",
"title": "Wonder Woman: Bloodlines",
"video": false,
"vote_average": 7.2,
"vote_count": 280
}

```



### Get Movie By Id

This will be sent from the front-end to the API

- If the movie is not present in DB, trigger an API request to
TMDB.
   - Store information in DB
   - Display results in front-end
- Else, retrieve information from DB
  - Display results in front-end

```/movie/:movie_id```

Method: **GET**

Status: **200**

Response

```
{
  "movieId": 123,
  "movieName": "Shawshank Redemption",
  "movieDescription": "Takes place in a jail",
  "movieUrl": "1dnugiergu4298hf.jpg",
  "movieRevenue": "32,543,432",
  "movieBudget":  "10,000,000",
  "movieGenre":   "Drama"
}

```

**Movie Not Found**

Status: **404**

```
{
   "status": 404,
   "message": "Movie not found."
}
```


### Login/Register


#### Login User

```/login```

Method: **POST**

Status: **200**

Request
``` 
{
  "userEmail": "myemail@gmail.com",
  "userPassword": "********"
}
```

Response
```
{
   "status": 200,
   "message": "Successfully logged in.",
   "userId": 1
}
```

Status: **401** Invalid Credentials


```
{
   "status": 401,
   "message": "Login credentials are invalid."
}
```

Status: **401** Invalid User


```
{
   "status": 401,
   "message": "User does not exist."
}
```



#### Register User

```/register```

Method: **POST**

Status: **201**

Request

```
{
 "userFirstName": "Michael",
 "userLastName": "Teixeira",
 "userEmailAddress": "myemail@gmail.com",
 "userPassword": "*********"
}
```

Response
```
{
 "status": 201,
 "message": "Successfully created",
 "userId": 1
}

```

Status: **422** User Already Exists

Response
```
{
 "status": 422,
 "message": "User already exists."
}

```


Status: **422** Invalid Body

```
{
   "status": 422,
   "message": "There was an error creating your account.",
   "errors": {
      "userFirstName": "Cannot be empty",
      "userPassword": "Must be at least 6 characters long"
    }
}

```

---
## Backend Components

### Dao

- UserDao
- MovieDao
- MovieListDao


### Controllers
- DashboardController
- UserController
- MovieListController
- MovieController


### Models
- User
- MovieList
- Movie


### Testing
- JUnit
- Mockito

### Frontend
- React

### Wireframe Concept

https://i.pinimg.com/564x/05/88/2e/05882e9ed9ec9fc5422454e5046ad35b.jpg






