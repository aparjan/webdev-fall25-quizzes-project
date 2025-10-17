"use client";

import { Button, Form } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import assignments from "../../../../Database/assignments.json";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div className="p-3">Assignment not found</div>;
  }

  // Helper function to convert date string to YYYY-MM-DD format
  const formatDateForInput = (dateStr: string) => {
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    // Otherwise return a default date
    return "2024-05-13";
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="wd-name"
            defaultValue={assignment.title}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={6}
            defaultValue={assignment.description}
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
              defaultValue={assignment.points}
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
                type="date"
                id="wd-due-select"
                name="due"
                defaultValue={formatDateForInput(assignment.dueDate || "")}
                className="mb-3"
              />

              <div className="row">
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-select"
                    name="availableFrom"
                    defaultValue={formatDateForInput(assignment.availableDate || "")}
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-until"
                    name="availableUntil"
                    defaultValue={formatDateForInput(assignment.availableUntilDate || "")}
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
          <Link href={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button
              variant="danger"
              id="wd-button-submit"
              type="button"
            >
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}