"use client";

import { Form, Button } from "react-bootstrap";
import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-signin-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Signin</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="wd-username"
              placeholder="username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              id="wd-password"
              placeholder="password"
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mb-2"
            id="wd-signin-btn"
            type="submit"
          >
            Signin
          </Button>
        </Form>

        <Link href="/Kambaz/Account/Signup" className="wd-signup-link">
          Signup
        </Link>
      </div>
    </div>
  );
}