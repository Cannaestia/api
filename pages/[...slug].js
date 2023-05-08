import React from 'react';
import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/auth';

async function getAccessToken(code) {
  const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
  const response = await axios.post(tokenUrl, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    },
  });

  return response.data.access_token;
}

async function getUserProfile(accessToken) {
  const url = 'https://api.linkedin.com/v2/me';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0',
  };

  const response = await axios.get(url, { headers });
  return response.data;
}

function LinkedInPage({ profile }) {
  return (
    <div>
      <h1>LinkedIn Profile</h1>
      {profile && (
        <>
          <p>ID: {profile.id}</p>
          <p>First Name: {profile.firstName.localized.en_US}</p>
          <p>Last Name: {profile.lastName.localized.en_US}</p>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const code = context.query.code;

  if (!code) {
    return { redirect: { destination: '/', permanent: false } };
  }

  try {
    const accessToken = await getAccessToken(code);
    const profile = await getUserProfile(accessToken);
    return { props: { profile } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export default LinkedInPage;
