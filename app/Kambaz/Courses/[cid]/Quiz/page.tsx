"use client";

import Link from "next/link";
import { BsGripVertical, BsRocketTakeoff } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchSharp } from "react-icons/io5";
import { Button } from "react-bootstrap";

export default function Quiz() {
  return (
    <div id="wd-quizzes" className="p-3">
      {/* Search Bar */}
      <div className="mb-3">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            id="wd-search-quiz"
          />
        </div>
      </div>

      {/* Quiz List */}
      <ul className="list-group rounded-0">
        {/* Assignment Quizzes Header */}
        <li className="list-group-item p-3 bg-secondary border">
          <div className="d-flex align-items-center">
            <div className="me-2">▼</div>
            <strong>Assignment Quizzes</strong>
          </div>
        </li>

        {/* Q1 */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsRocketTakeoff className="me-3 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Quizzes/Q1"
                className="wd-quiz-link text-decoration-none text-dark fw-bold"
              >
                Q1
              </Link>
              <div className="text-muted small">
                <span className="fw-bold">Closed</span> | Due Sep 24 at 11:59pm | 29 pts | 11 Questions
              </div>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        {/* Q2 */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsRocketTakeoff className="me-3 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Quizzes/Q2"
                className="wd-quiz-link text-decoration-none text-dark fw-bold"
              >
                Q2
              </Link>
              <div className="text-muted small">
                <span className="fw-bold">Closed</span> | Due Oct 1 at 11:59pm | 23 pts | 6 Questions
              </div>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        {/* Q3 */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsRocketTakeoff className="me-3 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Quizzes/Q3"
                className="wd-quiz-link text-decoration-none text-dark fw-bold"
              >
                Q3
              </Link>
              <div className="text-muted small">
                <span className="fw-bold">Available until</span> Oct 8 at 11:59pm | Due Oct 8 at 11:59pm | 32 pts | 7 Questions
              </div>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        {/* Q4 */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsRocketTakeoff className="me-3 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Quizzes/Q4"
                className="wd-quiz-link text-decoration-none text-dark fw-bold"
              >
                Q4
              </Link>
              <div className="text-muted small">
                <span className="fw-bold">Not available until</span> Oct 8 at 12am | Due Oct 15 at 11:59pm | 17 pts | 3 Questions
              </div>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>

        {/* Q5 */}
        <li className="list-group-item p-3">
          <div className="d-flex align-items-start">
            <BsRocketTakeoff className="me-3 fs-4 text-success" />
            <div className="flex-grow-1">
              <Link
                href="/Kambaz/Courses/1234/Quizzes/Q5"
                className="wd-quiz-link text-decoration-none text-dark fw-bold"
              >
                Q5
              </Link>
              <div className="text-muted small">
                <span className="fw-bold">Not available until</span> Oct 15 at 12am | Due Oct 22 at 11:59pm | 31 pts | 8 Questions
              </div>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
        </li>
      </ul>
    </div>
  );
}