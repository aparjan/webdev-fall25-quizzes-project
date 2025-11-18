"use client";

import { Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, addAssignment as addToStore, updateAssignment as updateInStore } from "../../../reducer";
import * as assignmentsClient from "../client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const isNewAssignment = aid === "new";
  const isFaculty = currentUser?.role === "FACULTY";

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    course: cid,
    description: "",
    points: 100,
    dueDate: "May 13 at 11:59pm",
    availableDate: "May 6 at 12:00am",
    availableUntilDate: "May 20 at 11:59pm",
  });

  useEffect(() => {
    if (existingAssignment && !isNewAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment, isNewAssignment]);

  const handleSave = async () => {
    try {
      if (isNewAssignment) {
        const newAssignment = await assignmentsClient.createAssignmentForCourse(cid as string, assignment);
        dispatch(addToStore(newAssignment));
      } else {
        const updatedAssignment = await assignmentsClient.updateAssignment(assignment);
        dispatch(updateInStore(updatedAssignment));
      }
      router.push(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  // If not faculty, show read-only view
  if (!isFaculty) {
    return (
      <div id="wd-assignments-editor" className="p-3">
        <h3>{existingAssignment?.title || "Assignment"}</h3>
        <p>{existingAssignment?.description}</p>
        <p><strong>Points:</strong> {existingAssignment?.points}</p>
        <p><strong>Due:</strong> {existingAssignment?.dueDate}</p>
        <p><strong>Available:</strong> {existingAssignment?.availableDate}</p>
        <p><strong>Until:</strong> {existingAssignment?.availableUntilDate}</p>
        <Link href={`/Kambaz/Courses/${cid}/Assignments`}>
          <Button variant="secondary">Back to Assignments</Button>
        </Link>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="wd-name"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={6}
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          />
        </Form.Group>

        <div className="row mb-3">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <div className="col-sm-10">
            <Form.Control
              type="number"
              id="wd-points"
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <div className="col-sm-10">
            <Form.Select id="wd-grp-select" name="group">
              <option>ASSIGNMENTS</option>
              <option>QUIZ</option>
              <option>PROJECT</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2} className="text-end">
            Display Grade as
          </Form.Label>
          <div className="col-sm-10">
            <Form.Select id="wd-grade-select" name="grade">
              <option>PERCENTAGE</option>
              <option>GRADE</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2} className="text-end">
            Submission Type
          </Form.Label>
          <div className="col-sm-10">
            <div className="border p-3">
              <Form.Select id="wd-submission-type" name="type" className="mb-3">
                <option>ONLINE</option>
                <option>OFFLINE</option>
              </Form.Select>

              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check
                type="checkbox"
                id="wd-chkbx-entry"
                name="entry1"
                label="Text Entry"
              />
              <Form.Check
                type="checkbox"
                id="wd-chkbx-webURL"
                name="entry2"
                label="Website URL"
              />
              <Form.Check
                type="checkbox"
                id="wd-chkbx-media"
                name="entry3"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-chkbx-student-annotation"
                name="entry4"
                label="Student Annotation"
              />
              <Form.Check
                type="checkbox"
                id="wd-chkbx-file-upload"
                name="entry5"
                label="File Uploads"
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <Form.Label column sm={2} className="text-end">
            Assign
          </Form.Label>
          <div className="col-sm-10">
            <div className="border p-3">
              <Form.Label className="fw-bold">Assign to</Form.Label>
              <Form.Select id="wd-assign-to" name="assign" className="mb-3">
                <option>Everyone</option>
                <option>Offline class</option>
                <option>Online class</option>
              </Form.Select>

              <Form.Label className="fw-bold">Due</Form.Label>
              <Form.Control
                type="text"
                id="wd-due-select"
                name="due"
                value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                className="mb-3"
                placeholder="May 13 at 11:59pm"
              />

              <div className="row">
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <Form.Control
                    type="text"
                    id="wd-available-select"
                    name="availableFrom"
                    value={assignment.availableDate}
                    onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                    placeholder="May 6 at 12:00am"
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control
                    type="text"
                    id="wd-available-until"
                    name="availableUntil"
                    value={assignment.availableUntilDate}
                    onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
                    placeholder="May 20 at 11:59pm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end">
          <Link href={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              variant="secondary"
              id="wd-button-cancel"
              className="me-2"
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Button
            variant="danger"
            id="wd-button-submit"
            type="button"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}