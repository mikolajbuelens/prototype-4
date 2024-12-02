"use client";

import Image from "next/image";
import { createClient, Provider } from "@supabase/supabase-js";
import styles from "../app/ui/login.module.css";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [user, setUser] = useState("");

  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();
  //     // setUser(user.email);
  //     console.log(user.email);
  //     setUser(user.email);
  //   }
  //   getUser();
  // }, [supabase]);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <header className="w-screen flex flex-col gap-4 items-center bg-red-500">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        ></Image>
        <h1 className="bg-red-600">test</h1>
      </header>
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>
      <h2 className="text-2xl font-bold text-center">User is: {user}</h2>
    </main>
  );
}
