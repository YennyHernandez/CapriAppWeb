
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey: string = process.env['API_KEY'] || '';
const authDomain:string = process.env['AUTH_DOMAIN'] || '';
const projectId:string = process.env['PROJECT_ID'] || '';
const storageBucket:string = process.env['STORAGE_BUCKET'] || '';
const messagingSenderId:string = process.env['MESSAGING_SENDER_ID'] || '';
const appId: string = process.env['APP_ID'] || '';
const measurementId:string = process.env['MEASUREMENT_ID'] || '';
export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId:projectId ,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId:appId, 
  measurementId: measurementId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);