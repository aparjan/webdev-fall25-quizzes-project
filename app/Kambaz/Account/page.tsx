"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();
  
  useEffect(() => {
    if (!currentUser) {
      router.push("/Kambaz/Account/Signin");
    } else {
      router.push("/Kambaz/Account/Profile");
    }
  }, [currentUser, router]);

  return null;
}