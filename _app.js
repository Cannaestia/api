
import { useRouter } from 'next/router';
import i18next from 'i18next';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    i18next.init({
      lng: router.locale || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: {
           
          },
        },
        fr: {
          translation: {
           
          },
        },
      },
    });
  }, [router.locale]);

  return <Component {...pageProps} />;
}

export default MyApp;





