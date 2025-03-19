import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const addUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(API_URL, userData);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUser = (id, userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
