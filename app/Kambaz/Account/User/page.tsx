"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import PeopleTable from "../../Courses/[cid]/People/Table/page";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await client.findAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
  const user = await client.createUser({
    _id: `${Date.now()}`, 
    firstName: "New",
    lastName: `User${users.length + 1}`,
    username: `newuser${Date.now()}`,
    password: "password123",
    email: `email${users.length + 1}@neu.edu`,
    section: "S101",
    role: "STUDENT",
  });
  setUsers([...users, user]);
};

  useEffect(() => {
    if (!currentUser) {
      router.push("/Kambaz/Account/Signin");
      return;
    }

    if (currentUser.role !== "ADMIN") {
      router.push("/Kambaz/Dashboard");
      return;
    }

    // Fetch all users
    fetchUsers();
  }, [currentUser, router]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mt-4">
      <h3>Users</h3>
      <div>
        <button 
          onClick={createUser} 
          className="float-end btn btn-danger wd-add-people"
        >
          <FaPlus className="me-2" />
          Users
        </button>
        <input
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name form-control"
          value={name}
        />
        <select 
          value={role} 
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}