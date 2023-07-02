import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // working on env later
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (data) => {
  let response;
  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const logout = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }
  return response;
};

export const create = async (data) => {
  let response;
  try {
    response = await api.post("/blog", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const getAllBlogs = async () => {
  let response;
  try {
    response = await api.get('/blog/all');
  } catch (error) {
    return error;
  }
  return response;
}

export const getById = async (id) => {
  let response;
  try {
    response = await api.get(`/blog/${id}`);
  } catch (error) {
    return error;
  }
  return response;
}