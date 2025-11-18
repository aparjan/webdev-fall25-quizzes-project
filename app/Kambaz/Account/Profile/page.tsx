"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/Kambaz/Account/Signin");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="wd-profile-container" style={{ width: "300px" }}>
        <h3 className="mb-3">Profile</h3>
        {profile && (
          <div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="wd-username"
                className="mb-2"
                value={profile.username || ""}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                id="wd-password"
                className="mb-2"
                value={profile.password || ""}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                placeholder="password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="wd-firstname"
                className="mb-2"
                value={profile.firstName || ""}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                placeholder="First Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="wd-lastname"
                className="mb-2"
                value={profile.lastName || ""}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                placeholder="Last Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                id="wd-dob"
                className="mb-2"
                value={profile.dob || ""}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="wd-email"
                className="mb-2"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select 
                id="wd-role" 
                className="mb-2" 
                value={profile.role || "USER"}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </Form.Select>
            </Form.Group>

            <Button
              onClick={updateProfile}
              className="btn btn-primary w-100 mb-2"
            >
              Update
            </Button>

            <Button
              onClick={signout}
              className="wd-signout-btn btn btn-danger w-100"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}