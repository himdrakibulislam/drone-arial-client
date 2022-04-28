const firebaseConfig = {
    apiKey: process.env.REACT_APP_DRONE_API_KEY ,
    authDomain: process.env.REACT_APP_DRONE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_DRONE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_DRONE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_DRONE_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_DRONE_APP_ID ,
    measurementId:  process.env.REACT_APP_DRONE_MEASUREMENT_ID,
  };
export default firebaseConfig;