import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBDvsez_73FViXJvxKAfZd4rlq1UOh8R5c",
    authDomain: "crwn-clothing-db-ab7b0.firebaseapp.com",
    projectId: "crwn-clothing-db-ab7b0",
    storageBucket: "crwn-clothing-db-ab7b0.appspot.com",
    messagingSenderId: "328952606766",
    appId: "1:328952606766:web:cc0578966218ed36232fbf"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt})
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }
    
    return userDocRef;
}