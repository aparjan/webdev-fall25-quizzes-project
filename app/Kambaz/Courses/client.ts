import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}`
  );
  return response.data;
};