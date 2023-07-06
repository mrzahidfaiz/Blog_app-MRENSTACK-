import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_SERVRE_PATH,
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
    response = await api.get("/blog/all");
  } catch (error) {
    return error;
  }
  return response;
};

export const getById = async (id) => {
  let response;
  try {
    response = await api.get(`/blog/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const update = async (data) => {
  let response;
  try {
    response = await api.put(`/blog`, data);
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteById = async (id) => {
  let response;
  try {
    response = await api.delete(`/blog/${id}`);
  } catch (error) {
    return error;
  }
  return response;
};

export const createComment = async (data) => {
  let response;
  try {
    response = await api.post("/comment", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const getCommentById = async (id) => {
  let response;
  try {
    response = await api.get(`/comment/${id}` , {
      validateStatus: false
    });
  } catch (error) {
    return error;
  }
  return response;
};

api.interceptors.response.use(
  (config) => {
    return config;
  }
  // async (error) => {
  //   let originalReq = error.config;

  //   if (
  //     (response.status === 401 || response.status === 500) &&
  //     originalReq &&
  //     !originalReq._isRetry
  //   ) {
  //     originalReq = true;

  //     try {
  //       await axios.get("http://localhost:8000/refresh", {
  //         withCredentials: true,
  //       });
  //       return api.request(originalReq);
  //     } catch (error) {
  //       return error;
  //     }
  //   }
  // }
);
