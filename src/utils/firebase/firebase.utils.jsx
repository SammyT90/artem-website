import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signinwithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
    getFirestore,
    doc, 
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyAV-YizVS8okS88q8iVgL1fPGLWvlNixEg",
  
    authDomain: "artem-clothing-db.firebaseapp.com",
  
    projectId: "artem-clothing-db",
  
    storageBucket: "artem-clothing-db.appspot.com",
  
    messagingSenderId: "1020963021653",
  
    appId: "1:1020963021653:web:33a334df86f4c67bb745dc"
  
  };
  
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName, 
            email,
            createAt
        });
    } catch (error) {
        console.log('error cretaing the user', error.message);
    }
  }

  return userDocRef;
};