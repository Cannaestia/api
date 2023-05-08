
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
            // add your English translations here
          },
        },
        fr: {
          translation: {
            // add your French translations here
          },
        },
      },
    });
  }, [router.locale]);

  return <Component {...pageProps} />;
}

export default MyApp;





