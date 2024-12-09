"use client";

import Image from "next/image";
import { createClient, Provider } from "@supabase/supabase-js";
import styles from "../app/ui/login.module.css";
import { useState, useEffect } from "react";
import { use } from "react";

export default function Dashboard() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [user, setUser] = useState("");
  const [providerToken, setProviderToken] = useState("");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      // setUser(user.email);
      console.log(user);
      console.log(user.email);
      setUser(user.email);
    }
    getUser();
  }, [supabase]);


  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    } else{
      console.log('Logged out')
      window.location.href = "/";
    }
  }



async function getProviderToken(){
  const session = await supabase.auth.getSession();
  console.log(session.data.session.provider_token)
  setProviderToken(session.data.session.provider_token)
  
  // console.log(session.provider_token)
  // return session
}



useEffect(() => {
  async function fetchRepos() {
    if (providerToken) {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${providerToken}`,
        },
      });
      const data = await response.json();
      setRepos(data);
      console.log(data);
    } else{
      console.error('No provider token')
     setRepos([
      {
        id: 1,
        name: "No data",
        language: "No data",
        html_url: "No data",
      },
     ])
    }
  }
  fetchRepos();
}, [providerToken]);


useEffect(() => {
  getProviderToken()
}
, [supabase]);



useEffect(() => {
  console.log(repos)
}
, [repos]);

  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <header className="w-screen flex flex-col gap-4 items-center border-b border-gray-500 p-4">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={150}
          height={25}
          priority
        ></Image>
        <div className="flex gap-2">
          LOGIN SYSTEM
          <div className="flex gap-2">
            <div className="m-2 w-2 h-2 bg-white rounded-full"></div>
          </div>
          DASHBOARD
        </div>
      </header>
      <div className="h-screen flex flex-row gap-4 items-center">
        <div className="sidebar  h-16 flex items-center justify-center">
          <div className="flex flex-col gap-4 border-r border-gray-500 pr-5 pl-5 h-screen">
            <a href="/dashboard" className="text-lg font-bold mt-5">
              Dashboard
            </a>
            <a href="/app/profile" className="text-lg font-bold">
              Profile
            </a>
            <button onClick={handleLogout} className="text-lg font-bold">
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center w-screen h-screen ">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-xl font-bold">Welcome to the dashboard</h2>
            <h2 className="text-2xl font-bold text-center">User is: {user}</h2>
          </div>

          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Language</th>
                <th className="px-4 py-2">Url</th>
              </tr>
            </thead>
            <tbody>
              
              {/* {repos.map((repo) => (
                <tr key={repo.id}>
                  <td className="border px-4 py-2">{repo.name}</td>
                  <td className="border px-4 py-2">{repo.language}</td>
                  <td className="border px-4 py-2">
                    <a href={repo.html_url}>{repo.html_url}</a>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
