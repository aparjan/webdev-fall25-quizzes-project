"use client";

import Link from "next/link";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Button } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* Search and Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <BsPlus className="fs-4" /> Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <BsPlus className="fs-4" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      <ul className="list-group rounded-0">
        {/* Assignments Header */}
        <li className="list-group-item p-3 bg-secondary border">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <div className="me-2">▼</div>
            <strong>ASSIGNMENTS</strong>
            <span className="ms-auto me-2">40% of Total</span>
            <BsPlus className="fs-4 me-2" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        {/* Assignment Items */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsGripVertical className="me-2 fs-3" />
            <MdAssignment className="me-3 fs-3 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A1
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am |
                <br />
                Due May 13 at 11:59pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success me-2 fs-5" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsGripVertical className="me-2 fs-3" />
            <MdAssignment className="me-3 fs-3 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Assignments/A2"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A2
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> | Not available until May 13 at 12:00am |
                <br />
                Due May 20 at 11:59pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success me-2 fs-5" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsGripVertical className="me-2 fs-3" />
            <MdAssignment className="me-3 fs-3 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Assignments/A3"
                className="wd-assignment-link text-decoration-none text-dark fw-bold"
              >
                A3
              </Link>
              <div className="text-muted small">
                <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am |
                <br />
                Due May 27 at 11:59pm | 100 pts
              </div>
            </div>
            <FaCheckCircle className="text-success me-2 fs-5" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>
      </ul>
    </div>
  );
}