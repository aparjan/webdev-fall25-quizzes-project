"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment as deleteFromStore } from "../../../Courses/reducer";
import * as assignmentsClient from "./client";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchSharp } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Button } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchAssignments = async () => {
    if (!cid) return;
    try {
      const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteFromStore(assignmentId));
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const filteredAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

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
        {isFaculty && (
          <div>
            <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
              <BsPlus className="fs-4" /> Group
            </Button>
            <Link href={`/Kambaz/Courses/${cid}/Assignments/new`}>
              <Button variant="danger" id="wd-add-assignment">
                <BsPlus className="fs-4" /> Assignment
              </Button>
            </Link>
          </div>
        )}
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
            {isFaculty && (
              <>
                <BsPlus className="fs-4 me-2" />
                <IoEllipsisVertical className="fs-4" />
              </>
            )}
          </div>
        </li>

        {/* Assignment Items - Dynamic */}
        {filteredAssignments.map((assignment: any) => (
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
              {isFaculty && (
                <FaTrash
                  className="text-danger me-2 fs-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(assignment._id)}
                />
              )}
              <FaCheckCircle className="text-success me-2 fs-5" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}