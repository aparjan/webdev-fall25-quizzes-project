"use client";

import { ReactNode, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div id="wd-courses">
        <h2>
          <FaAlignJustify 
            className="me-4 fs-4 mb-1"
            style={{ cursor: "pointer" }}
          />
          Loading...
        </h2>
        <hr />
        <div className="d-flex">
          <div className="flex-fill">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div 
          className="d-none d-md-block me-4 overflow-hidden transition-all"
          style={{ 
            width: showNav ? "270px" : "0px",
            transition: "width 0.3s ease"
          }}
        >
          <div style={{ width: "270px" }}>
            <CourseNavigation />
          </div>
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}