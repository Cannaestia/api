import React from 'react';

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const redirectUri = 'http://localhost:3000/auth';
const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile`;

function Linkedin() {
  return (
    <div>
      <h1>LinkedIn Scraper</h1>
      <a href={authUrl}>Connect with LinkedIn</a>
    </div>
  );
}

export default Linkedin;
