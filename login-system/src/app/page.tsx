/* eslint-disable @next/next/no-async-client-component */
"use client";

import Image from "next/image";
import styles from "../app/ui/login.module.css"; // test out css module
import { use, useState } from "react";
import { useEffect } from "react";
import { connectDB } from "./lib/data";
import { getServerSession } from "next-auth";
import { createClient, Provider } from "@supabase/supabase-js";


// ! ----Note to self: Remember to change domain for each provider when deploying (currently localhost:3000)----


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { data, error } = await supabase
  //   .from('users')
  //   .select()
  //   console.log(data, error)


  // temp function to test if user is logged in => user should be redirected (to dashboard)
  async function getUser(){
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user)
  }



  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, error);
  }

  // takes a provider as a argument and logs in user with the help of supabase
  async function handleProvider(provider: Provider) {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  })
  console.log(data, error)
  }
  return (
    <>
      {/* {client && <p className="to-blue-600">connected</p>} */}

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <form onSubmit={handleLogin} className={styles.form}>
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
            <button type="submit">Login</button>
            <h2>OR</h2>
            <button onClick={() => handleProvider('github')}
              className={`${styles.provider} ${styles.github}`}
              type="submit"
            >
              <Image
                className="dark:invert"
                src="/github.svg"
                alt="Github logo"
                width={20}
                height={20}
                priority
              />
              Sign in with Github
            </button>
            <button onClick={() => handleProvider('google')}
              type="submit"
              className={`${styles.provider} ${styles.google}`}
            >
              {" "}
              <Image
                src="/google.png"
                alt="Google logo"
                width={20}
                height={20}
                
                priority
              />{" "}
              Sign in with Google
            </button>
            <button onClick={() => handleProvider('facebook')}
              className={`${styles.provider} ${styles.facebook}`}
              type="submit"
            >
              {" "}
              <Image
                src="/facebook.png"
                alt="Facebook logo"
                width={20}
                height={20}
                priority
              />{" "}
              Sign in with Facebook
            </button>
            <button onClick={getUser}
            >Get User
            </button>
            <button className={`${styles.provider} ${styles.x}`} type="submit">
              {" "}
              <Image 
                className="dark:invert"
                src="/X.svg"
                alt="X logo"
                width={20}
                height={20}
                priority
              />{" "}
              Sign in with X
            </button>
            -{" "}
          </form>
          <h2>
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </h2>
        </main>
      </div>
    </>
  );
}
