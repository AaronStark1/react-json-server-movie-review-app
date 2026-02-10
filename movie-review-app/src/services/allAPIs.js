import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

export const signupAPI = async(reqBody)=> {
    return await commonAPI("POST",`${serverURL}/users`,reqBody)
}

export const getUserByUsernameAPI = async(username)=>{
    return await commonAPI("GET", `${serverURL}/users?username=${username}`);
}

export const addMovieAPI = async(reqBody)=> {
    return await commonAPI("POST",`${serverURL}/movies`,reqBody)
}

export const getAllMoviesAPI = async () => {
  return await commonAPI("GET", `${serverURL}/movies`);
};

export const getMoviesByUserAPI = async (username) => {
    return await commonAPI("GET",`${serverURL}/movies?user=${username}`);
}
export const getSingleMovieAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/movies/${id}`);
};

export const updateMovieAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${serverURL}/movies/${id}`, reqBody);
};
export const deleteMovieAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/movies/${id}`);
};
