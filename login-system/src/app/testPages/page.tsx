/* eslint-disable react-hooks/rules-of-hooks */
// 'use client';

import Image from "next/image";
// import styles from "../app/ui/login.module.css"; // test out css module
import { use, useState } from "react";
import { useEffect } from "react";
import { connectDB } from "../lib/data";
import { getServerSession } from "next-auth";

export default async function testPage() {

const session = await getServerSession();
console.log(session);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log(username);
  // };
// const [client, setClient] = useState(null);

// const client = await connectDB();
  

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
        {/* <form>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form> */}
      </main>
    </div>
  
  </>
  );
}
