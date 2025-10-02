"use client";

import { Form, Button } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-profile-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Profile</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              className="wd-username"
              defaultValue="alice"
              placeholder="username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              className="wd-password"
              defaultValue="123"
              placeholder="password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="wd-firstname"
              defaultValue="Alice"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="wd-lastname"
              defaultValue="Wonderland"
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              id="wd-dob"
              defaultValue="2000-01-01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              id="wd-email"
              defaultValue="alice@wonderland.com"
              placeholder="email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select id="wd-role" defaultValue="USER">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          <Link href="/Kambaz/Account/Signin">
            <Button
              variant="danger"
              className="w-100 mb-3"
              id="wd-signout-btn"
              type="button"
            >
              Signout
            </Button>
          </Link>
        </Form>

        <div className="text-center">
          <Link href="/Kambaz" className="wd-kambaz-link">
            Back to Kambaz
          </Link>
        </div>
      </div>
    </div>
  );
}