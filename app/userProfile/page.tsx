"use client";
import MainLayout from "../layouts/mainLayout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  interface userType {
    email: string;
    username: string;
  }

  const [user, setUser] = useState<userType>();

  async function getUser() {
    const req = await fetch("/api/me");
    const res = await req.json();
    setUser(res);
  }

  setInterval(() => {
    if (user && !user.email) {
      router.push("/");
    }
  }, 3000);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MainLayout>
      <div className="userprofile">
        <div className="profile-info">
          <h4>Profile</h4>
          {user && (
            <>
              <h1>{user.username}</h1>
              <p>{user.email}</p>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
