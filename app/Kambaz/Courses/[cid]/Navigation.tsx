"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  
  const links = [
    { name: "Home", path: "Home" },
    { name: "Modules", path: "Modules" },
    { name: "Piazza", path: "Piazza" },
    { name: "Zoom", path: "Zoom" },
    { name: "Assignments", path: "Assignments" },
    { name: "Quizzes", path: "Quiz" },
    { name: "Grades", path: "Grades" },
    { name: "People", path: "People/Table" }
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.name}
          href={`/Kambaz/Courses/${cid}/${link.path}`}
          className={`list-group-item border-0 ${
            pathname.includes(link.path) 
              ? "active bg-white text-dark" 
              : "text-danger"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}