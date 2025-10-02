"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

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