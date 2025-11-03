"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "./reducer";
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

  const addCourse = () => {
    dispatch(addNewCourse(course));
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description"
    });
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id && enrollment.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (currentUser) {
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  const filteredCourses = showAllCourses
    ? courses
    : currentUser
    ? isFaculty
      ? courses
      : courses.filter((course: any) => isEnrolled(course._id))
    : [];

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
              onClick={() => dispatch(updateCourse(course))}>
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
        {currentUser && (
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
                    src={course.image} 
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
                              dispatch(deleteCourse(course._id));
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