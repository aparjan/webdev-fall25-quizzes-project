"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid username or password");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Kambaz/Dashboard");
    } catch (err: any) {
      setError("Invalid username or password");
    }
  };

  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-signin-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Sign in</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={credentials.username || ""}
              onChange={(e) => {
                setError("");
                setCredentials({ ...credentials, username: e.target.value });
              }}
              placeholder="username"
              id="wd-username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              value={credentials.password || ""}
              onChange={(e) => {
                setError("");
                setCredentials({ ...credentials, password: e.target.value });
              }}
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