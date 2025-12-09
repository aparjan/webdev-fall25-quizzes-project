import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
  return data;
};

export const unpublishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/unpublish`);
  return data;
};

// Quiz Attempts
export const submitQuizAttempt = async (quizId: string, attempt: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, attempt);
  return data;
};

export const getLatestAttempt = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/latest`);
  return data;
};

export const getAllAttempts = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data;
};