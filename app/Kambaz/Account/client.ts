import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllUsers = async () => { 
  const response = await axiosWithCredentials.get(USERS_API); 
  return response.data; 
};

export const USERS_API = process.env.NEXT_PUBLIC_REMOTE_SERVER 
  ? `${process.env.NEXT_PUBLIC_REMOTE_SERVER}/api/users`
  : "http://localhost:4000/api/users";

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findMyCourses = async () => {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return [];
    }
    throw error;
  }
};

export const findMyEnrollments = async () => {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return [];
    }
    throw error;
  }
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

/*export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};*/

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data;
};