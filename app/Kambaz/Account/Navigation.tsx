"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="list-group wd-account-navigation">
        <Link
          href="/Kambaz/Account/Signin"
          className={`list-group-item list-group-item-action border-0 ${
            pathname.includes("/Signin") ? "active text-dark bg-white" : "text-danger bg-white"
          }`}
        >
          Signin
        </Link>
        <Link
          href="/Kambaz/Account/Signup"
          className={`list-group-item list-group-item-action border-0 ${
            pathname.includes("/Signup") ? "active text-dark bg-white" : "text-danger bg-white"
          }`}
        >
          Signup
        </Link>
        <Link
          href="/Kambaz/Account/Profile"
          className={`list-group-item list-group-item-action border-0 ${
            pathname.includes("/Profile") ? "active text-dark bg-white" : "text-danger bg-white"
          }`}
        >
          Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="list-group wd-account-navigation">
      {!currentUser && (
        <>
          <Link
            href="/Kambaz/Account/Signin"
            className={`list-group-item list-group-item-action border-0 ${
              pathname.includes("/Signin") ? "active text-dark bg-white" : "text-danger bg-white"
            }`}
          >
            Signin
          </Link>
          <Link
            href="/Kambaz/Account/Signup"
            className={`list-group-item list-group-item-action border-0 ${
              pathname.includes("/Signup") ? "active text-dark bg-white" : "text-danger bg-white"
            }`}
          >
            Signup
          </Link>
        </>
      )}
      {currentUser && (
        <Link
          href="/Kambaz/Account/Profile"
          className={`list-group-item list-group-item-action border-0 ${
            pathname.includes("/Profile") ? "active text-dark bg-white" : "text-danger bg-white"
          }`}
        >
          Profile
        </Link>
      )}
    </div>
  );
}