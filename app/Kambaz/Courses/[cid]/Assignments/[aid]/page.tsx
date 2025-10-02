"use client";

import { Button, Form } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="wd-name"
            defaultValue="A1 - ENV + HTML"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={6}
            defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
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
              defaultValue={100}
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
                defaultValue="2024-05-13"
                className="mb-3"
              />

              <div className="row">
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-select"
                    name="availableFrom"
                    defaultValue="2024-05-06"
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-until"
                    name="availableUntil"
                    defaultValue="2024-05-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            id="wd-button-cancel"
            className="me-2"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            id="wd-button-submit"
            type="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}