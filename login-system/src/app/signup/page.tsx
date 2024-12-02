/* eslint-disable @next/next/no-async-client-component */
"use client";

import Image from "next/image";
import styles from "../ui/login.module.css"; // test out css module
import { use, useState } from "react";
import { useEffect } from "react";
import { createClient, Provider } from "@supabase/supabase-js";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleSignUp(e) {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(data, error);
    window.location.href = "/";
  }


  return (
    <>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert ml-10"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <form onSubmit={handleSignUp} className={styles.form}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign up</button>
          </form>
        </main>
      </div>
    </>
  );
}
