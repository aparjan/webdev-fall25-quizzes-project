"use client";

import Link from "next/link";
import * as db from "../Database";

export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
            <div className="card">
              <Link 
                href={`/Kambaz/Courses/${course._id}/Home`} 
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <img 
                  src={course.image} 
                  className="card-img-top" 
                  width="100%" 
                  height="160" 
                  alt={course.name} 
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </h5>
                  <p className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description}
                  </p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}