"use client";

import { Form, Button } from "react-bootstrap";
import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-signup-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Sign up</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              className="wd-username"
              placeholder="username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              className="wd-password"
              placeholder="password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              className="wd-password-verify"
              placeholder="verify password"
            />
          </Form.Group>

          <Link href="/Kambaz/Account/Profile">
            <Button
              variant="primary"
              className="w-100 mb-2"
              id="wd-signup-btn"
              type="button"
            >
              Sign up
            </Button>
          </Link>
        </Form>

        <Link href="/Kambaz/Account/Signin" className="wd-signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}