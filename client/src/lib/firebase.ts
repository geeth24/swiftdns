import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCEpwEadKdNeW_yyDZu6zeBvIq0tA3wOcE',
  authDomain: 'swiftdns-prod.firebaseapp.com',
  projectId: 'swiftdns-prod',
  storageBucket: 'swiftdns-prod.appspot.com',
  messagingSenderId: '8781019597',
  appId: '1:8781019597:web:60e7f04de141b3e708ac84',
  measurementId: 'G-C6DTNCM3B3',
};

const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
const auth = getAuth(app);
export { app, analytics, auth };
