"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Kambaz/Account/Profile");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-signup-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Sign up</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={user.username || ""}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="wd-username mb-2"
              placeholder="username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              value={user.password || ""}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="wd-password mb-2"
              placeholder="password"
            />
          </Form.Group>

          <Button
            onClick={signup}
            variant="primary"
            className="w-100 mb-2"
            id="wd-signup-btn"
            type="button"
          >
            Sign up
          </Button>
        </Form>

        <Link href="/Kambaz/Account/Signin" className="wd-signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}