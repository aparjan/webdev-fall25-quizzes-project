"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, deleteCourse as deleteFromStore, updateCourse as updateInStore } from "../Courses/reducer";
import { enrollCourse, unenrollCourse, setEnrollments } from "./reducer";
import * as userClient from "../Account/client";
import * as courseClient from "../Courses/client";
import * as enrollmentClient from "./client";
import Link from "next/link";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  // Fetch courses and enrollments when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🌐 Dashboard: Fetching courses and enrollments...");
        console.log("👤 Current user:", currentUser);
        
        if (currentUser) {
          if (currentUser.role === "FACULTY") {
            // Faculty sees ALL courses by default
            const allCourses = await courseClient.findAllCourses();
            console.log("✅ Dashboard: All courses fetched for faculty:", allCourses);
            dispatch(setCourses(allCourses));
          } else {
            // Students see their enrolled courses
            const fetchedCourses = await userClient.findMyCourses();
            console.log("✅ Dashboard: My courses fetched:", fetchedCourses);
            dispatch(setCourses(fetchedCourses));
            
            // Fetch enrollments for students
            const fetchedEnrollments = await userClient.findMyEnrollments();
            console.log("✅ Dashboard: Enrollments fetched:", fetchedEnrollments);
            dispatch(setEnrollments(fetchedEnrollments));
          }
        }
      } catch (error) {
        console.error("❌ Dashboard: Error fetching data:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, dispatch]);

  // Fetch all courses when "All Courses" is clicked
  useEffect(() => {
    const fetchAllCourses = async () => {
      if (showAllCourses && !isFaculty) {
        try {
          console.log("🌐 Dashboard: Fetching ALL courses...");
          const allCourses = await courseClient.findAllCourses();
          console.log("✅ Dashboard: All courses fetched:", allCourses);
          dispatch(setCourses(allCourses));
        } catch (error) {
          console.error("❌ Dashboard: Error fetching all courses:", error);
        }
      } else if (!showAllCourses && currentUser && !isFaculty) {
        // Fetch back the user's enrolled courses
        try {
          const fetchedCourses = await userClient.findMyCourses();
          dispatch(setCourses(fetchedCourses));
        } catch (error) {
          console.error("❌ Dashboard: Error fetching my courses:", error);
        }
      }
    };

    if (currentUser) {
      fetchAllCourses();
    }
  }, [showAllCourses, currentUser, dispatch]);

  const addCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      dispatch(deleteFromStore(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      dispatch(updateInStore(course));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      const enrollment = await enrollmentClient.enrollInCourse(courseId);
      dispatch(enrollCourse(enrollment));
      
      // Refresh enrollments
      const fetchedEnrollments = await userClient.findMyEnrollments();
      dispatch(setEnrollments(fetchedEnrollments));
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentClient.unenrollFromCourse(courseId);
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
      
      // Refresh enrollments
      const fetchedEnrollments = await userClient.findMyEnrollments();
      dispatch(setEnrollments(fetchedEnrollments));
      
      // If not showing all courses, refresh the list to remove unenrolled course
      if (!showAllCourses) {
        const fetchedCourses = await userClient.findMyCourses();
        dispatch(setCourses(fetchedCourses));
      }
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  const filteredCourses = isFaculty 
    ? courses  // Faculty always see all courses
    : showAllCourses
      ? courses  // Students showing all courses
      : courses.filter((course: any) => isEnrolled(course._id));  // Students showing only enrolled

  if (!isClient) {
    return null;
  }
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {isFaculty && (
        <>
          <h5>New Course
            <button 
              className="btn btn-warning float-end ms-2" 
              id="wd-update-course-click"
              onClick={updateCourse}>
              Update
            </button>
            <button 
              className="btn btn-primary float-end" 
              id="wd-add-new-course-click"
              onClick={addCourse}>
              Add
            </button>
          </h5>
          <br />
          <input 
            value={course.name} 
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="New Course Name"
          />
          <textarea 
            value={course.description} 
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="New Course Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
        {currentUser && !isFaculty && (
          <button 
            className="btn btn-primary float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "My Courses" : "All Courses"}
          </button>
        )}
      </h2>
      <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {filteredCourses.map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
              <div className="card rounded-3 overflow-hidden">
                <Link 
                  href={`/Kambaz/Courses/${course._id}/Home`} 
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled(course._id) && !isFaculty) {
                      e.preventDefault();
                    }
                  }}
                >
                  <img 
                    src={course.image || "/images/reactjs.jpg"} 
                    width="100%" 
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary">Go</button>
                      
                      {isFaculty && (
                        <div>
                          <button 
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2">
                            Edit
                          </button>
                          <button 
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }} 
                            className="btn btn-danger"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                        </div>
                      )}

                      {!isFaculty && currentUser && (
                        <div>
                          {isEnrolled(course._id) ? (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                              className="btn btn-danger"
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
                              }}
                              className="btn btn-success"
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}