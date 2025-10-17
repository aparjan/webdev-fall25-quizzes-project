"use client";

import { ReactNode, useState, use } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { courses } from "../../Database";

export default function CoursesLayout(
  { children, params }: Readonly<{ 
    children: ReactNode;
    params: Promise<{ cid: string }>;
  }>) {
  const { cid } = use(params);
  const course = courses.find((course) => course._id === cid);
  const [showNav, setShowNav] = useState(false);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        /> 
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className={`wd-course-nav-wrapper ${showNav ? 'show' : ''}`}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}