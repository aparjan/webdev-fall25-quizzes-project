"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Button } from "react-bootstrap";
import assignments from "../../../Database/assignments.json";

export default function Assignments() {
  const { cid } = useParams();

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

        {/* Assignment Items - Dynamic */}
        {assignments
          .filter((assignment) => assignment.course === cid)
          .map((assignment) => (
            <li key={assignment._id} className="list-group-item p-3">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-3 fs-3 text-success" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> | 
                    Not available until {assignment.availableDate} |
                    <br />
                    Due {assignment.dueDate} | {assignment.points} pts
                  </div>
                </div>
                <FaCheckCircle className="text-success me-2 fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}