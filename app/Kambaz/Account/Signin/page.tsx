"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-signin-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Sign in</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              defaultValue={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="username"
              id="wd-username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              defaultValue={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="password"
              id="wd-password"
            />
          </Form.Group>

          <Button
            onClick={signin}
            id="wd-signin-btn"
            className="w-100 mb-2"
            variant="primary"
          >
            Sign in
          </Button>
        </Form>

        <Link href="/Kambaz/Account/Signup" id="wd-signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}