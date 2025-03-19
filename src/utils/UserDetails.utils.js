import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const fetchUserDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
