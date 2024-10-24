import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": "application/json",
    }
});

export const GetUserProfile = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};


// export const GetUserFriends = async (profileId) => {
//     try {
//         const response = await axiosInstance.get(`/friends/${profileId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching friends list:",error);
//         throw error;
//     }
// }

export const GetUserFriends = async (profileId, page) => {
    try {
      const response = await axiosInstance.get(`/friends/${profileId}?page=${page}&limit=8`);
      return response.data;
    } catch (error) {
      console.error('Error fetching friends list:', error);
      throw error;
    }
};