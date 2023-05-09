import React from "react";
import Head from "next/head";

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const redirectUri = 'http://localhost:3000/auth';
const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile`;

export default function Linkedin() {
  return (
    <div>
      <Head>
        <title>LinkedIn Scraper</title>
        <meta name="description" content="LinkedIn Scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>LinkedIn Scraper</h1>
        <a href={authUrl}>Connect with LinkedIn</a>
      </main>
    </div>
  );
}

