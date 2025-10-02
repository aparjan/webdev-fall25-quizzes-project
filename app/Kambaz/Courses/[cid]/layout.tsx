"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default function CoursesLayout(
  { children }: Readonly<{ children: ReactNode }>) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        /> 
        Course 1234
      </h2>
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