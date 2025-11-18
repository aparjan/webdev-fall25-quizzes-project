import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
};