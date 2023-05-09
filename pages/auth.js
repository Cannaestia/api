import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/auth';

async function getAccessToken(code) {
  const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
  const response = await axios.post(tokenUrl, null, {
    headers: {
      'Content-Type': 'application/JSON',
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

export default function AuthPage() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      getAccessToken(code)
        .then((accessToken) => {
          // Here you can handle the access token. For example, you could store it in
          // local storage and redirect the user to another page.
          localStorage.setItem('linkedin_access_token', accessToken);
          router.push('/[...slug]');
        })
        .catch((error) => {
          console.error(error);
          // Here you could handle the error, for example by showing an error message to the user.
        });
    }
  }, [code, router]);

  return <div>Loading...</div>;
}
