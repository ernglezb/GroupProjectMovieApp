
export const baseRoute = 'http://localhost:8080/api/v1';
export const loginRoute = `${baseRoute}/login`;
export const registerRoute = `${baseRoute}/register`;



export const createMovieListUrl = userId => {
    return `${baseRoute}/user/${userId}/list`;
}



