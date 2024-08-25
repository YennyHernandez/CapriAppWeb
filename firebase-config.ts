
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env['ANGULAR_API_KEY'],
  authDomain: process.env['ANGULAR_AUTH_DOMAIN'],
  projectId: process.env['ANGULAR_PROJECT_ID'],
  storageBucket: process.env['ANGULAR_STORAGE_BUCKET'],
  messagingSenderId: process.env['ANGULAR_MESSAGING_SENDER_ID'],
  appId: process.env['ANGULAR_APP_ID'], 
  measurementId: process.env['ANGULAR_MEASUREMENT_ID'],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); //instancia de Firebase Storage
export { storage, analytics };