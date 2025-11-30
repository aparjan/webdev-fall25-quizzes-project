'use client'
import { ReactNode, useEffect } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Session from "./Account/Session";
import { setCourses } from "./Courses/reducer";
import { setEnrollments } from "./Dashboard/reducer";
import * as userClient from "./Account/client";
import "./styles.css";

function KambazContent({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCoursesAndEnrollments = async () => {
    if (!currentUser) return;
    try {
      const [courses, enrollments] = await Promise.all([
        userClient.findMyCourses(),
        userClient.findMyEnrollments()
      ]);
      dispatch(setCourses(courses));
      dispatch(setEnrollments(enrollments));
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          {children}
        </div>
      </div>
    </Session>
  );
}

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <KambazContent>{children}</KambazContent>
    </Provider>
  );
}