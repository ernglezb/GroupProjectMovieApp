import {createMovieListUrl, baseRoute} from '../../api/api-routes';

export const createMovieList = async function(userId, listName, listDescription){

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({listName, listDescription})
    }

    const response = await fetch(createMovieListUrl(userId), options);
    const data = await response.json();

    return data;
}

export const addMovieToPlaylist = async (userId, listId, movieId) => {
    const url = `${baseRoute}/user/${userId}/list/${listId}/movie/${movieId}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

export const getUserLists = async function(userId) {
  const url = `${baseRoute}/user/${userId}/list`;
  const response = await fetch(url);
  return await response.json();
};

export const editUserList = async function(userId, listId, listName, listDescription){
    const url = `${baseRoute}/user/${userId}/list/${listId}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({listId, listName, listDescription, userId})
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export const deleteUserList = async function(userId, listId){
    const url = `${baseRoute}/user/${userId}/list/${listId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export const getMoviesFromMovieList  = async function(userId, listId){
    const url = `${baseRoute}/user/${userId}/list/${listId}/movie`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const deleteMovieFromMovieList = async function(userId, listId, movieId){
    const url = `${baseRoute}/user/${userId}/list/${listId}/movie/${movieId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}